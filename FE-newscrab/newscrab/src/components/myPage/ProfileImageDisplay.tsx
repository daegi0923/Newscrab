import React from 'react';
import styled from 'styled-components';

const ProfileImageWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  margin-bottom: 2px;
`;

const ProfileImage = styled.img`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  border: 2px solid #ccc;
`;

const EditButton = styled.button`
  position: absolute;
  bottom: 0;
  right: 0;
  background-color: #ffbe98;
  border: none;
  padding: 5px 8px;
  border-radius: 50%;
  cursor: pointer;

  &:hover {
    background-color: #e09520;
  }
`;

interface ProfileImageDisplayProps {
  src: string;
  onEdit: () => void;
}

const ProfileImageDisplay: React.FC<ProfileImageDisplayProps> = ({ src, onEdit }) => {
  return (
    <ProfileImageWrapper>
      <ProfileImage src={src} alt="프로필 이미지" />
      <EditButton onClick={onEdit}>✏️</EditButton>
    </ProfileImageWrapper>
  );
};

export default ProfileImageDisplay;
