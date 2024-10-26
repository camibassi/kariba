import React, { useState, useContext } from 'react';
import { AuthContext } from '../components/AuthContext';
import { useOutletContext } from 'react-router-dom';
import '../routes/user/index.css'

const UpdateUserForm = () => {
  const { user } = useContext(AuthContext); // Pegando o usuário do contexto
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    // Implementação de lógica para validar e salvar a nova senha
    if (newPassword === confirmNewPassword) {
      alert('Senha atualizada com sucesso!');
      // Aqui, adicione a lógica de atualização interna
    } else {
      alert('As senhas novas não coincidem');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
          <div className='formulario'>
            <label className='label'>Usuário:</label>
            <input type="text" value={user.username?.toUpperCase()} readOnly />
          </div>
          <div className='formulario'>
            <label className='label'>Senha Atual:</label>
            <input 
              type="password" 
              value={currentPassword} 
              onChange={(e) => setCurrentPassword(e.target.value)} 
            />
          </div>
          <div className='formulario'>
            <label className='label'>Nova Senha:</label>
            <input 
              type="password" 
              value={newPassword} 
              onChange={(e) => setNewPassword(e.target.value)} 
            />
          </div>
          <div className='formulario'>
            <label className='label'>Confirme Nova Senha:</label>
            <input 
              type="password" 
              value={confirmNewPassword} 
              onChange={(e) => setConfirmNewPassword(e.target.value)} 
            />
          </div>
          <button type="submit">Atualizar Senha</button>
    </form>
  );
};

export default UpdateUserForm;
