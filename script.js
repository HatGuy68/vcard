
function saveData() {
    const name = document.getElementById('name').value;
    const title = document.getElementById('title').value;
    const organization = document.getElementById('organization').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const website = document.getElementById('website').value;
    const address = document.getElementById('address').value;

    const userData = {
        name, title, organization, phone, email, website, address
    };

    localStorage.setItem('vcardData', JSON.stringify(userData));
    displayVCard(userData);
    showVCardPage();
}

function displayVCard(data) {
    let vcardText = `BEGIN:VCARD\nVERSION:3.0\nN:${data.name}\nFN:${data.name}\nTITLE:${data.title || ''}\nORG:${data.organization || ''}\nTEL:${data.phone || ''}\nEMAIL:${data.email || ''}\nURL:${data.website || ''}\nADR:${data.address || ''}\nEND:VCARD`;

    document.getElementById('name-out').innerText = data.name;
    document.getElementById('phone-out').innerText = data.phone;
    document.getElementById('title-out').innerText = data.title + ',';
    document.getElementById('organization-out').innerText = data.organization;
    document.getElementById('email-out').innerText = data.email;
    document.getElementById('website-out').innerText = data.website;

    const qrcodeDiv = document.getElementById("qrcode");
    qrcodeDiv.innerHTML = "";
    new QRCode(qrcodeDiv, { text: vcardText, width: 128, height: 128 });
}

function showVCardPage() {
    document.getElementById('form-page').style.display = 'none';
    document.getElementById('vcard-page').style.display = 'block';
}

function showForm() {
    document.getElementById('vcard-page').style.display = 'none';
    document.getElementById('form-page').style.display = 'block';
}

window.onload = () => {
    const storedData = localStorage.getItem('vcardData');
    if (storedData) {
        const userData = JSON.parse(storedData);
        displayVCard(userData);
        showVCardPage();
    } else {
        showForm();
    }
};