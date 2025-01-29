interface FirebaseConfig {
    apiKey: string;
    authDomain: string;
    projectId: string;
    storageBucket: string;
    messagingSenderId: string;
    appId: string;
}

export const environment = {
    production: false,
    firebase: {
        apiKey: "AIzaSyAj95Hdrka4o1aDeVILogNIPjgAxYYgdpY",
        authDomain: "photoapp-system.firebaseapp.com",
        projectId: "photoapp-system",
        storageBucket: "photoapp-system.firebasestorage.app",
        messagingSenderId: "354877554062",
        appId: "1:354877554062:web:bba2f91509e05ccec9f8df"
    } as FirebaseConfig
};
