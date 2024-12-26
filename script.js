function handleCredentialResponse(response) {
    document.getElementById('loading').style.display = 'block';
    document.getElementById('error-message').style.display = 'none';

    try {
        const responsePayload = decodeJwtResponse(response.credential);
        
        console.log("ID: " + responsePayload.sub);
        console.log('Full Name: ' + responsePayload.name);
        console.log('Email: ' + responsePayload.email);
        console.log('Picture: ' + responsePayload.picture);

        localStorage.setItem('user', JSON.stringify({
            id: responsePayload.sub,
            name: responsePayload.name,
            email: responsePayload.email,
            picture: responsePayload.picture
        }));

        window.location.href = "dashboard.html";
    } catch (error) {
        showError('登录处理过程中发生错误，请重试');
        console.error('Login error:', error);
    } finally {
        document.getElementById('loading').style.display = 'none';
    }
}

function decodeJwtResponse(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    return JSON.parse(jsonPayload);
}

function showError(message) {
    const errorDiv = document.getElementById('error-message');
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

window.onload = function() {
    const user = localStorage.getItem('user');
    if (user) {
        window.location.href = "dashboard.html";
    }
} 