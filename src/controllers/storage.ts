import { type User } from "@prisma/client";
import { type RequestHandler } from "express";
import { initializeApp } from "firebase/app";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
  measurementId: process.env.FIREBASE_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);

export const uploadImage: RequestHandler = (req, res) => {
  const handleUploadImage = async (file: Express.Multer.File, path: string) => {
    const avatarRef = ref(storage, path);
    await uploadBytes(avatarRef, file.buffer);
    const url = await getDownloadURL(avatarRef);
    return url;
  };

  const file = req.file;

  if (!file) {
    return res.status(400).json({ err: "No file uploaded" });
  }

  const path = `users/${(req.user as User).id}`;

  handleUploadImage(file, path)
    .then((url) => {
      res.json({ url });
    })
    .catch((err) => {
      res.status(500).json({ err });
    });
};
