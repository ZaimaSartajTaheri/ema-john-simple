import * as firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from './firebase.config';

export const initializeFirebaseFramework=()=>{
    firebase.initializeApp(firebaseConfig);
}
export const handleGoogleSignIn=()=>{
    const provider = new firebase.auth.GoogleAuthProvider();
    return firebase.auth().signInWithPopup(provider)
    .then(res=> {
        
        const {displayName,email,photoURl}=res.user;
        const signedInUser={
            isSignedIn:true,
            name:displayName,
            email:email,
            photo:photoURl,
            error:'',
            success:true
           

        }
        setUserToken();
        return signedInUser;
        

       
      }).catch(err=>{
          console.log(err);
      })
}
const setUserToken = () => {
  firebase.auth().currentUser.getIdToken(/* forceRefresh */ true).then(function(idToken) {
    sessionStorage.setItem('token', idToken);
  }).catch(function(error) {
    // Handle error
  });
}

export const handleGoogleSignOut=()=>{
    
        return firebase.auth().signOut()
        .then(()=> {
            
            
            const signedOutUser={
                isSignedIn:false,
                name:'',
                email:'',
                photo:'',
                error:'',
                success:false

            }
            return signedOutUser;
            

           
          }).catch(err=>{
              console.log(err);
          })
    
}

export const createWithEmailPassword=(name,email,password)=>{
    return firebase.auth().createUserWithEmailAndPassword(email,password)
            .then(res=>{
            const newUserInfo = res.user;            
            newUserInfo.error ='';
            newUserInfo.success=true;
            updateUserName(name);
            return newUserInfo;
            

            }).catch(error=> {
                // Handle Errors here.
                let errorMessage = error.message;
                const newUserInfo = {};
                newUserInfo.error =errorMessage;
                newUserInfo.success =false;
                return newUserInfo;
                
               
                
                // ...
              });
}

export const signInWithEmailPassword=(email,password)=>{
    return firebase.auth().signInWithEmailAndPassword(email,password)
    .then(res=>{
        const newUserInfo = res.user;
        newUserInfo.error ='';
        newUserInfo.success=true;
        return newUserInfo;

        }).catch(error=> {
        // Handle Errors here.
        let errorMessage = error.message;
        const newUserInfo = {};
        newUserInfo.error =errorMessage;
        newUserInfo.success =false;
        return newUserInfo;
        // ...
      });
}
 const updateUserName = name =>{
    const user = firebase.auth().currentUser;

    user.updateProfile({
      displayName: name
    }).then(function() {
      console.log('user name updated successfully')
    }).catch(function(error) {
      console.log(error)
    });
  }
