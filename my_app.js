
const button_array = document.getElementById('button_array');

async function validateInitData(botToken) {
  // 1. Получаем закодированную строку из WebAppData
  const encodedString = window.WebApp?.InitData;
  if (!encodedString) {
    console.error('InitData отсутствует');
    return false;
  }

  // 2. URL‑декодирование всей строки
  const decoded = decodeURIComponent(encodedString);

  // 3. Разбиваем на пары "ключ=значение" по &
  const pairs = decoded.split('&');

  // 4. Обрабатываем пары: формируем {key}={value}, исключаем 'hash'
  const dataParts = [];
  let hashFromInitData = null;

  for (const pair of pairs) {
    if (!pair) continue;

    const [key, value] = pair.split('=').map(part => part || '');
    const decodedKey = decodeURIComponent(key);
    const decodedValue = decodeURIComponent(value);

    if (decodedKey === 'hash') {
      hashFromInitData = decodedValue;
      continue; // пропускаем hash
    }

    dataParts.push(`{${decodedKey}}=${decodedValue}`);
  }

  // 5. Сортируем в алфавитном порядке и объединяем через \n
  const dataCheckString = dataParts.sort().join('\n');

  // 6. Создаём secret_key: HMAC-SHA256('WebAppData', botToken)
  const secretKey = await calculateHMAC('WebAppData', botToken);

  // 7. Вычисляем подпись для dataCheckString: HMAC-SHA256(secretKey, dataCheckString)
  const calculatedHash = await calculateHMAC(dataCheckString, secretKey);

  // 8. Сравниваем с hash из InitData
  const isValid = calculatedHash === hashFromInitData;

  if (isValid) {
    console.log('Валидация успешна: данные подлинные');
  } else {
    console.warn('Валидация провалена: данные изменены или токен неверен');
  }

  return isValid;
}

// Вспомогательная функция: вычисляет HMAC-SHA256 и возвращает hex-строку
async function calculateHMAC(message, key) {
  // Кодируем ключ и сообщение в ArrayBuffer
  const encoder = new TextEncoder();

  const keyBuffer = encoder.encode(key);
  const messageBuffer = encoder.encode(message);

  // Импортируем ключ для HMAC-SHA256
  const cryptoKey = await crypto.subtle.importKey(
    'raw',
    keyBuffer,
    { name: 'HMAC', hash: 'SHA-256' },
    false,
    ['sign']
  );

  // Вычисляем подпись
  const signature = await crypto.subtle.sign('HMAC', cryptoKey, messageBuffer);

  // Преобразуем в hex-строку
  const hashArray = Array.from(new Uint8Array(signature));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex;
}


const Userid=11111;
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
	
	window.open(url,site,false)
}
	if (event.target && event.target.matches('.button_requestContact')) {
		window.WebApp.equestContact();
	}
});
window.WebApp.ready();


