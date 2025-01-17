import { ID, Query } from 'appwrite';
import { INewPost, INewUser } from "@/types";
import { account, appwriteConfig, avatars, databases, storage } from './config';

export async function createUserAccount(user: INewUser) {
    try {
        const newAccount = await account.create(
            ID.unique(),
            user.email,
            user.password,
            user.name
        );
  
        if (!newAccount) throw Error;
  
        const avatarUrl = new URL(avatars.getInitials(user.name));

        const newUser = await saveUserToDB({
            accountId: newAccount.$id,
            name: newAccount.name,
            email: newAccount.email,
            username: user.username,
            imageUrl: avatarUrl,
        });

  
        return newUser;
    } 
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching account:', error.message, error);
        } else {
            console.error('Error fetching account:', error);
        }
    }
    
  }

  export async function saveUserToDB(user: {
    accountId: string;
    email: string;
    name: string;
    imageUrl: URL;
    username?: string;
  }) {
    try {
      const newUser = await databases.createDocument(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        ID.unique(),
        user
      );
  
      return newUser;
    } 
    catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching account:', error.message, error);
        } else {
            console.error('Error fetching account:', error);
        }
    }
  }

export async function signInAccount(user: {email: string; password: string;}) {
    try{
        const session = await account.createEmailPasswordSession(user.email, user.password)
        console.log('Session created:', session);
        return session;  
        
    }
    catch(err){
        console.log(err)
    }
}

export async function getAccount() {
    try {
      const currentAccount = await account.get();
  
      return currentAccount;
    } catch (error) {
      console.log(error);
    }
  }

export async function getCurrentUser() {
    try {
      const currentAccount = await getAccount();
  
      if (!currentAccount) throw Error;
  
      const currentUser = await databases.listDocuments(
        appwriteConfig.databaseId,
        appwriteConfig.userCollectionId,
        [Query.equal("accountId", currentAccount.$id)]
      );
  
      if (!currentUser) throw Error;
  
      return currentUser.documents[0];
    } catch (error) {
      console.log(error);
      return null;
    }
  }

export async function signOutAccount() {
  try {
    const session = await account.deleteSession('current');
    return session;
  }
  catch (error) {
    console.log(error)
    return error;
  }
}

export async function CreatePost(post: INewPost) {
  try {
    const uploadedFile = await uploadFile(post.file[0]);

    if(!uploadedFile) throw Error;

    //Get File url
    const fileUrl = getFilePreview(uploadFile.$id);

    if(!fileUrl) {
      deleteFile(uploadedFile.$id);
      throw Error;
    }
  }
  catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file: File) {
  try {
    const uploadedFile = await storage.createFile(
    appwriteConfig.storageId,
    ID.unique(),
    file
  );
  return uploadFile;
  }
  catch (error) {
    console.log(error);
  }
}

export async function getFilePreview( fileId: string) {
  try {
    const fileURl = storage.getFilePreview(
      appwriteConfig.storageId,
      fileId,
      2000,
      2000,
      "top",
      100,
    )
    return fileURl;
  } catch(error) {
    console.log(error);
  }
}