import React, { useState } from "react";
import styled from "styled-components";
import profile1 from "@assets/auth/profile1.jpg";
import profile2 from "@assets/auth/profile2.jpg";
import profile3 from "@assets/auth/profile3.jpg";

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background: white;
  padding: 2%;
  border-radius: 10px;
  max-width: 800px;
  width: 40%;
  height: 40%;
  text-align: center;
  align-items: center;
`;

const ImageOption = styled.img<{ isSelected: boolean }>`
  width: 180px;
  height: 180px;
  border-radius: 50%;
  margin: 20px;
  cursor: pointer;
  border: ${({ isSelected }) =>
    isSelected ? "3px solid #ffbe98" : "1px solid #ccc"};

  &:hover {
    border: 3px solid #e09520;
  }
`;

const Button = styled.button`
  margin-top: 20px;
  background-color: #ffbe98;
  border: none;
  padding: 10px 20px;
  border-radius: 10px;
  cursor: pointer;

  &:hover {
    background-color: #e09520;
  }
`;

interface ProfileImageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectImage: (image: string) => void;
}

const images = [
  { src: profile1, alt: "profile1" },
  { src: profile2, alt: "profile2" },
  { src: profile3, alt: "profile3" },
];

const ProfileImageModal: React.FC<ProfileImageModalProps> = ({
  isOpen,
  onClose,
  onSelectImage,
}) => {
  const [selectedImage, setSelectedImage] = useState<string>("");

  if (!isOpen) return null;

  // const getImageLabel = (src: string) => {
  //   if (src === profile1) return 'A';
  //   if (src === profile2) return 'B';
  //   if (src === profile3) return 'C';
  //   return '';
  // };

  return (
    <ModalOverlay>
      <ModalContent>
        <h2>프로필 이미지 선택</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          {images.map((image, index) => (
            <ImageOption
              key={index}
              src={image.src}
              alt={image.alt}
              isSelected={selectedImage === image.src}
              onClick={() => setSelectedImage(image.src)}
            />
          ))}
        </div>
        <Button
          onClick={() => {
            onSelectImage(selectedImage); // 경로를 전달합니다.
            onClose();
          }}
        >
          확인
        </Button>
      </ModalContent>
    </ModalOverlay>
  );
};

export default ProfileImageModal;
