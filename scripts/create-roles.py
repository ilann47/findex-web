import requests
 
keycloak_base_url = "https://keycloak-gedt.itaipuparquetec.org.br/"
realm = "itaipu-siri"
idClient = "e41d70ef-7ec5-46ee-a1a4-0962fc84046f"
clientId = "gedv-app"
username = "admin"
password = "admin"

# url to keycloak adapter get roles route
role_url = "http://172.25.76.109:8080/api/auth/role"
 
keycloak_token_url = f"{keycloak_base_url}/realms/{realm}/protocol/openid-connect/token" 
 
base_params = {
    "realm": realm,
    "idClient": idClient,
}

# format = name, description, associatedRoles (from realm-management)
roles = [
    ("UAR_LIST", "Listar UAR"),
    ("UAR_UPDATE", "Atualizar UAR"),
    ("UAR_CREATE", "Cadastrar UAR"),
    ("UAR_CHANGE_STATUS", "Mudar status (habilitada/desabilitada) de UAR"),
    ("INSTRUMENT_LIST", "Listar instrumento"),
    ("INSTRUMENT_UPDATE", "Atualizar instrumento"),
    ("INSTRUMENT_CREATE", "Cadastrar instrumento"),
    ("INSTRUMENT_CHANGE_STATUS", "Mudar status (habilitado/desabilitado) de instrumento"),
    ("INSTRUMENT_CALIBRATION_LIST", "Listar calibrações de instrumento"),
    ("INSTRUMENT_CALIBRATION_UPDATE", "Atualizar calibração de instrumento"),
    ("INSTRUMENT_CALIBRATION_CREATE", "Cadastrar calibração de instrumento"),
    ("INSTRUMENT_CALIBRATION_DELETE", "Apagar calibração de instrumento"),
    ("INSTRUMENT_READING_LIST", "Listar leituras de instrumento"),
    ("INSTRUMENT_ENGINEERING_DATA_LIST", "Listar valores de engenharia de instrumento"),
    ("INSTRUMENT_CHANNEL_LIST", "Listar canais de instrumento"),
    ("ALARM_LIST", "Listar alarmes"),
    ("ALARM_COLOR_UPDATE", "Atualizar cores de alarme"),
    ("AUTH_GROUP_LIST", "Listar grupos", ["manage-users", "manage-realm", "view-users", "query-clients", "query-groups", "query-users", "view-clients"]),
    ("AUTH_GROUP_ASSIGN_ROLE", "Atribuir permissões a um grupo", ["manage-users", "manage-realm", "view-users", "query-clients", "query-groups", "query-users", "view-clients"]),
    ("AUTH_GROUP_REMOVE_ROLE", "Remover permissões de um grupo", ["manage-users", "manage-realm", "view-users", "query-clients", "query-groups", "query-users", "view-clients"]),
    ("AUTH_USER_LIST", "Listar usuários", ["manage-users", "manage-realm", "view-users", "query-clients", "query-groups", "query-users", "view-clients"]),

]
 
def get_keycloak_token():
    data = {
        "client_id": clientId,
        "username": username,
        "password": password,
        "grant_type": "password",
    }
   
    try:
        response = requests.post(keycloak_token_url, data=data)
        response.raise_for_status()
        return response.json().get("access_token")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao obter o token do Keycloak: {e}")
        return None
 
 
def list_roles(url, token):
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    try:
        response = requests.get(url, params=base_params, headers=headers)
        if response.status_code == 200 :
            return response.json().get("content", [])
        else:
            print(f"Erro ao listar roles. Código de status: {response.status_code}, Detalhes: {response.text}")
            return []
    except requests.exceptions.RequestException as e:
        print(f"Erro ao listar roles: {e}")
        return []
 
 
def delete_role(url, token, role_name):
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
    params = base_params.copy()
    params["roleName"] = role_name
 
    try:
        response = requests.delete(url, params=params, headers=headers)
        if response.status_code == 204:
            print(f"Role '{role_name}' deletada com sucesso!")
        else:
            print(f"Falha ao deletar a role '{role_name}'. Código de status: {response.status_code}, Detalhes: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao deletar a role '{role_name}': {e}")
 
 
def create_role(url, token, role_name, role_description, role_composites=None):
    headers = {
        "Authorization": f"Bearer {token}",
        "Content-Type": "application/json"
    }
 
    body = {
        "params": base_params,
        "name": role_name,
        "description": role_description,
        "composite": bool(role_composites)
    }
 
    if role_composites:
        body["composites"] = {
            "client": {
                "realm-management": role_composites
            }
    }
         
    try:
        response = requests.post(url, json=body, headers=headers)
        if response.status_code == 201:
            print(f"Role '{role_name}' criada com sucesso!")
        else:
            print(f"Falha ao criar a role '{role_name}'. Código de status: {response.status_code}, Detalhes: {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Erro ao criar a role '{role_name}': {e}")
 
 
def main():
    token = get_keycloak_token()
    if not token:
        print("Não foi possível obter o token. Encerrando o script.")
        return
 
    existing_roles = list_roles(role_url, token)
 
    if existing_roles:
        for role in existing_roles:
            role_name = role.get("name")
            if role_name:
                delete_role(role_url, token, role_name)
 
    for role in roles:
        role_name = role[0]
        role_description = role[1]
        role_composites = role[2] if len(role) > 2 else None
        create_role(role_url, token, role_name, role_description, role_composites)
 
if __name__ == "__main__":
    main()