const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
];
const weekdays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
];
const giveaway = document.querySelector('.giveaway');
const deadline = document.querySelector('.deadline');
const items = document.querySelectorAll('.deadline-format h4');

// Geçici bir tarih oluşturulur ve bu tarihle ilgili özellikler alınır.
let tempDate = new Date();
let tempYear = tempDate.getFullYear();
let tempMonth = tempDate.getMonth();
let tempDay = tempDate.getDate();

// let futureDate = new Date(2024, 0, 15, 21, 0, 0); yukarıdaki kod ile değiştirildi

//Bu satır, tempYear, tempMonth ve tempDay değişkenlerini kullanarak bir tarih oluşturuyor. Bu değişkenler, sayfanın yüklendiği anki tarihin yıl, ay ve gün değerlerini içerir. Yani, bu tarih, sayfanın yüklendiği tarihe 10 gün eklenerek belirlenmiş oluyor.
const futureDate = new Date(tempYear, tempMonth, tempDay + 10, 11, 30, 0);

// Belirli özellikleri alma.
const year = futureDate.getFullYear();
const hours = futureDate.getHours();
const minutes = futureDate.getMinutes();
let month = futureDate.getMonth();
month = months[month];
const date = futureDate.getDate();
const weekday = weekdays[futureDate.getDay()];

// Bu satırda, .giveaway sınıfına sahip bir HTML elementinin metin içeriği, giveaway'nin sona ereceği tarihi ve saati içerir. Bu bilgiler, yukarıda alınan özelliklerle oluşturulur.
giveaway.textContent = `giveaway ends on ${weekday} ${date} ${month} ${year} ${hours}.${minutes}am`;

// Future Time in Miliseconds
const futureTime = futureDate.getTime(); // Gelecekteki tarih milisaniye cinsinden alınır.

// Kalan zamanı hesaplamak için bir fonksiyon tanımlanır.
function getRemainingTime() {
    const today = new Date().getTime();
    const t = futureTime - today; // t değişkeni, futureTime - today ifadesiyle gelecekteki tarih ile bugünkü tarih arasındaki toplam milisaniye farkını temsil eder.
    // 1s = 1000ms
    // 1m = 60s
    // 1hr = 60m
    // 1d = 24hr

    // Values in Miliseconds
    const oneDay = 24 * 60 * 60 * 1000; // "oneDay", bir günün milisaniye cinsinden değerini temsil eder.
    const oneHour = 60 * 60 * 1000; // "oneHour" bir saatin,
    const oneMinute = 60 * 1000; // "oneMinute" bir dakikanın ve "1000" bir saniyenin milisaniye cinsinden değerleridir.

    // Calculate All Values
    let days = t / oneDay
    days = Math.floor(days);
    let hours = Math.floor((t % oneDay) / oneHour);
    // "t % oneDay" ifadesi, toplam milisaniye farkının bir günün milisaniye değerine bölümünden kalanı verir. Bu işlem, geçen gün sayısını temsil eder. (t % oneDay) / oneHour ifadesi, geçen günün geri kalan kısmının bir saatlik bölüme bölümünden kalanını verir. Bu, geçen saati temsil eder.
    let minutes = Math.floor((t % oneHour) / oneMinute); // "(t % oneHour) / oneMinute" ifadesi, geçen saatin geri kalan kısmının bir dakikalık bölüme bölümünden kalanını,
    let seconds = Math.floor((t % oneMinute) / 1000); // "(t % oneMinute) / 1000" ifadesi ise geçen dakikanın geri kalan kısmının bir saniyelik bölüme bölümünden kalanını temsil eder.

    // Set Values Array;
    const values = [days, hours, minutes, seconds];

    // Eğer kalan zaman negatifse, yani çekiliş bitmişse, setInterval'ten çıkılır ve bir mesaj gösterilir.
    function format(item) {
        if (item < 10) {
            return item = `0${item}`
        }
        return item
    }

    items.forEach(function (item, index) {
        item.innerHTML = format(values[index]);
    });
    if (t < 0) {
        clearInterval(countdown);
        deadline.innerHTML = `<h4 class="expired">Sorry, this giveaway has expired</h4>`;
    }

}
// Countdown - Geri sayımı her saniye güncellemek için setInterval kullanılır.
let countdown = setInterval(getRemainingTime, 1000);
// Bu satır, getRemainingTime fonksiyonunu her 1000 milisaniyede bir çağıran bir zamanlayıcı oluşturur. Yani, sayfa yüklendiğinde başlayan bu süreç, belirli aralıklarla (her saniye) devam eder. Bu, sayfadaki geri sayımın her saniyede bir güncellenmesini sağlar.


// Sayfa yüklendiğinde getRemainingTime fonksiyonu çağrılır.
getRemainingTime();