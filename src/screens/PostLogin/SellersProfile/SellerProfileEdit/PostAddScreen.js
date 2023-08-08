import { showAlert } from "@app/helper/commonFunction";
import React from "react";
import { View } from "react-native";
import ImageCropPicker from "react-native-image-crop-picker";

const PostAdd = () => {
    const openPicker = async () => {

    }

    const openCameraMode = async () => {
        showAlert({
            title: 'Choose Mode',
            actions: [
                {
                    text: 'Photo',
                    onPress: choosePicFromCamera
                },
                {
                    text: 'Cancel',
                    Style: 'cancel',
                }

            ],
        });
    };
    const openGalleryMode = async () => {
        showAlert({
            title: 'Choose Mode',
            actions: [
                {
                    text: 'Phots',
                    onPress: choosePicFromGallery,
                },
                {
                    text: 'Cancel',
                    Style: 'cancel'
                },
            ],
        });
    };
    const choosePicFromCamera = () => {
        ImageCropPicker.openCamera({
            width: 300,
            height: 400,
            cropping: true
        }).then(image => {
            if (image?.size <= 5242880)
                // updateProductImage(image);
                console.log("Image too large");
        })
    }




    return (
        <View>

        </View>
    )


}