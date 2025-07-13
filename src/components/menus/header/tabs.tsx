import { Tab, Tabs } from '@mui/material';
import { useAtom } from 'jotai';
import { SyntheticEvent, useEffect } from 'react';

import { isAdminModeAtom } from '../../../contexts/atoms/admin-mode';
import { useDirectorAccess } from '../../../hooks/useDirectorAccess';

export const HeaderTabs = () => {
  const [isAdminMode, setIsAdminMode] = useAtom(isAdminModeAtom);
  const { hasDirectorAccess } = useDirectorAccess();

  // Se o usuário perde acesso de diretor, resetar para modo usuário
  useEffect(() => {
    if (!hasDirectorAccess && isAdminMode) {
      setIsAdminMode(false);
    }
  }, [hasDirectorAccess, isAdminMode, setIsAdminMode]);

  // Se o usuário não tem acesso de diretor, não mostrar as tabs
  if (!hasDirectorAccess) {
    return null;
  }

  const handleTabChange = (_event: SyntheticEvent, newValue: boolean) => {
    setIsAdminMode(newValue);
  };

  return (
    <Tabs
      value={isAdminMode}
      onChange={handleTabChange}
      indicatorColor="secondary"
      textColor="inherit"
      sx={{
        minHeight: 'auto',
        '& .MuiTabs-indicator': {
          backgroundColor: 'white',
        },
        '& .MuiTab-root': {
          color: 'rgba(255, 255, 255, 0.7)',
          minHeight: 'auto',
          padding: '8px 16px',
          fontSize: '0.875rem',
          '&.Mui-selected': {
            color: 'white',
          },
        },
      }}
    >
      <Tab label="Usuário" value={false} />
      <Tab label="Administrador" value={true} />
    </Tabs>
  );
};
