package com.gihojise.newscrab.enums;

public enum ProfileImage {
    IMAGE_1("image1.png"),
    IMAGE_2("image2.png"),
    IMAGE_3("image3.png"),
    IMAGE_4("image4.png"),
    IMAGE_5("image5.png");

    private final String imageName;

    ProfileImage(String imageName) {
        this.imageName = imageName;
    }

    public String getImageName() {
        return imageName;
    }
}
