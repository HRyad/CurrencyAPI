






if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/CurrencyAPI/sw.js')
  .then(function(reg) {
    // registration worked
    console.log('Registration succeeded. Scope is ' + reg.scope);
  }).catch(function(error) {
    // registration failed
    console.log('Registration failed with ' + error);
  });
}


self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open('v1').then(function(cache) {
      return cache.addAll([
         '/',
        'CurrencyAPI/currency.js',
        'CurrencyAPI/index.html',
        'CurrencyAPI/sw.js'
      ]);
    })
  );
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    caches.match(event.request).then(function(resp) {
      return resp || fetch(event.request).then(function(response) {
        return caches.open('v1').then(function(cache) {
          cache.put(event.request, response.clone());
          return response;
        });  
      });
    })
  );
});


function test(){

/*let url = 'https://free.currencyconverterapi.com/api/v5/currencies';

fetch(url)
.then(res => res.json())
.then((out) => {
  console.log('Checkout this JSON! ', out);

})
.catch(err => { throw err });*/

let sel = document.getElementById("box1");
let text1= sel.options[sel.selectedIndex].text;

sel = document.getElementById("box2");
let text2= sel.options[sel.selectedIndex].text;

let amount=document.getElementById("amount").value;
let val=0; 

 url = 'https://free.currencyconverterapi.com/api/v5/convert?q='+text1+'_'+text2+'&compact=y';
fetch(url)
.then(res => res.json())
.then((out) => {
for (var key in out) { // the json key CUR_CUR is dynamique
    val=out[key].val;
}
  document.getElementById("result").value = amount*val; 

})
.catch(err => { throw err });


}
