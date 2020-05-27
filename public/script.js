document.addEventListener('DOMContentLoaded', function () {
    try {
        var ui = new firebaseui.auth.AuthUI(firebase.auth());
        var button = document.getElementById('logout')
        button.addEventListener('click', function(){
            firebase.auth().signOut()
        })
        var uiConfig = {
            callbacks: {
                signInSuccessWithAuthResult: function (authResult, redirectUrl) {
                    return false;
                },
            },
            signInFlow: 'popup',
            signInSuccessUrl: '/',
            signInOptions: [
                firebase.auth.GoogleAuthProvider.PROVIDER_ID,
                firebase.auth.GithubAuthProvider.PROVIDER_ID,
            ],
        };
        var button = document.getElementById('logout')
        firebase.auth().onAuthStateChanged(function (user) {
            button.hidden = !user
            if (user) {
                var displayName = document.createElement('p')
                var avatar = document.createElement('img')
                var info = document.createElement('div')
                displayName.textContent = user.displayName
                avatar.src = user.photoURL
                info.appendChild(displayName)
                info.appendChild(avatar)
                document.getElementById('container').innerHTML = displayName.outerHTML + avatar.outerHTML
            } else {
                document.getElementById('container').innerHTML = ''
                ui.start('#container', uiConfig);
            }
        });
    } catch (e) {
        console.error(e);
    }
});
