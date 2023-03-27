import { ref, onMounted, watch } from "vue";
import {
  Camera,
  CameraResultType,
  CameraSource,
  Photo,
} from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";

export function usePhotoGallery() {
  const takePhoto = async () => {
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      quality: 100,
    });
    const response = await fetch(photo.webPath);
    const blob = await response.blob();
    var reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onloadend = function () {
      var base64data = reader.result;
      console.log(base64data);
      var photos = JSON.parse(localStorage.getItem("photos"));
      console.log(photos);
      if (!photos || photos.length == 0) {
        photos = [];
      }
      photos.push(base64data);

      localStorage.setItem("photos", JSON.stringify(photos));
      console.log(photos);
      /*      localStorage.getItem("photos", (err, photos) => {
        if (photos && photos.length > 0) {
          photos.push(base64data);
        } else {
          photos = [base64data];
        }
        localStorage.setItem("photos", photos);
        console.log(photos);
      });
      */
    };
  };

  return {
    takePhoto,
  };
}
