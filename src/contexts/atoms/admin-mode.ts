import { atom } from 'jotai';

// Atom para controlar se está no modo administrador
export const isAdminModeAtom = atom(false);

// Atom derivado que combina o modo admin com as permissões do usuário
export const canAccessAdminModeAtom = atom(false);
