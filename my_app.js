
const button_array = document.getElementById('button_array');
console.log(WebApp.initDataManager.initDataUnsafe());
const user = WebApp.initDataManager.initDataUnsafe.user;
const BackButton = window.WebApp.BackButton;
if (user.name !== "") {
	const userName = user.name;
	document.querySelector('#hi').textContent = 'Добро пожаловать, '+ userName + '.';
}
const Userid = user.id;
const links = {
                 
                'Московский регион':'https://w.gbooking.ru/?NETWORK_ID=352&utm_source=max&referrer=https://web.max.ru/'+Userid,
                'Санкт - Петербург':'https://w.gbooking.ru/?NETWORK_ID=334&utm_source=max&referrer=https://web.max.ru/'+Userid,
                'Белгород':'https://w.gbooking.ru/?BUSINESS_ID=4000000007234&utm_source=max&referrer=https://web.max.ru/'+Userid,
                'Иркутск':'https://medongroup-irk.ru?utm_source=max&referrer=https://web.max.ru/'+Userid,
                'Красноярск':'https://w.gbooking.ru/?BUSINESS_ID=4000000008128&utm_source=max&referrer=https://web.max.ru/'+Userid,
                'Новосибирск':'https://w.gbooking.ru/?BUSINESS_ID=4000000008008&utm_source=max&referrer=https://web.max.ru/'+Userid,
                'Оренбург':'https://w.gbooking.ru/?BUSINESS_ID=4000000008190&utm_source=max&referrer=https://web.max.ru/'+Userid,
                'Пермь':'https://w.gbooking.ru/?BUSINESS_ID=4000000007998&utm_source=max&referrer=https://web.max.ru/'+Userid,
                'Самара':'https://w.gbooking.ru/?BUSINESS_ID=4000000007745&utm_source=max&referrer=https://web.max.ru/'+Userid,
                'Севастополь':'https://w.gbooking.ru/?BUSINESS_ID=4000000007233&utm_source=max&referrer=https://web.max.ru/'+Userid,
                'Тольятти':'https://w.gbooking.ru/?BUSINESS_ID=4000000008349&utm_source=max&referrer=https://web.max.ru/'+Userid,
                'Тюмень':'https://w.gbooking.ru/?BUSINESS_ID=4000000007862&utm_source=max&referrer=https://web.max.ru/'+Userid,
                'Уфа':'https://w.gbooking.ru/?BUSINESS_ID=4000000008377&utm_source=max&referrer=https://web.max.ru/'+Userid,
                'Хабаровск':'https://w.gbooking.ru/?BUSINESS_ID=4000000008127&utm_source=max&referrer=https://web.max.ru/'+Userid,
				'Ярославль':'https://w.gbooking.ru/?BUSINESS_ID=4000000008191&utm_source=max&ureferrer=https://web.max.ru/'+Userid,
				'Записаться через сайт': 'https://medongroup.ru?utm_source=max&referrer=https://web.max.ru/'+Userid, 
    };
button_array.addEventListener('click', function(event) {
  // Проверяем, что клик был по кнопке с классом 'action-btn'
  if (event.target && event.target.matches('.button_link')) {
    const button = event.target;
    
    // Получаем данные из атрибутов
	const site = button.dataset.site;
	
    const url = links[site];
	openClinic = true
	document.location.href = url;
	BackButton.show();  
}
	if (event.target && event.target.matches('.button_requestContact')) {
		window.WebApp.requestContact();
	}
});

BackButton.onClick()
	{
	BackButton.hide(); 	
};
window.WebApp.ready();



















