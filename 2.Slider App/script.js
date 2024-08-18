var models = [
    {
        name: 'Bmw M5 CS',
        image: 'img/1.jpg',
        link : 'https://www.bmw-m.com/en/topics/magazine-article-pool/bmw-m5-cs-2021.html'
    },
    {
        name: 'Bmw M5 CS',
        image: 'img/2.jpg',
        link : 'https://www.bmw-m.com/en/topics/magazine-article-pool/bmw-m5-cs-2021.html'
    },
    {
        name: 'BMW M5 CS, Laser Led Headlights ',
        image: 'img/3.jpg',
        link : 'https://www.bmw-m.com/en/topics/magazine-article-pool/bmw-m5-cs-2021.html'
    },
    {
        name: 'BMW M5 CS, 3.0 Engine',
        image: 'img/4.jpg',
        link : 'https://www.bmw-m.com/en/topics/magazine-article-pool/bmw-m5-cs-2021.html'
    },
    {
        name: 'Bmw M5 CS',
        image: 'img/5.jpg',
        link : 'https://www.bmw-m.com/en/topics/magazine-article-pool/bmw-m5-cs-2021.html'
    },
    {
        name: 'Bmw M5 CS',
        image: 'img/6.jpg',
        link : 'https://www.bmw-m.com/en/topics/magazine-article-pool/bmw-m5-cs-2021.html'
    },
];

var index = 0;
var slaytCount = models.length;
var interval
var settings={
    duration : "2000",
    random : false
};
init(settings); 


// Okların yönetimi

document.querySelector('.fa-arrow-left').addEventListener("click",function(){
    index--;
    showSlide(index);
    console.log(index);
});

document.querySelector('.fa-arrow-right').addEventListener("click",function(){
    index++;
    showSlide(index);
    console.log(index);
});

//Okların üstüne gelince slayt durması
document.querySelectorAll('.arrow').forEach(function(item) {
    item.addEventListener("mouseenter",function() {
        clearInterval(interval);
    })
});

document.querySelectorAll('.arrow').forEach(function(item){
    item.addEventListener("mouseleave",function(){
        init(settings);
    })
});



function showSlide(i) {

    index = i;

    if (i<0) {
        index=slaytCount - 1;
    }
    if (i>=slaytCount) {
        index=0;
    }

    // Kartların yönetimi
    document.querySelector('.card-title').textContent=models[index].name;

    document.querySelector('.card-img-top').setAttribute('src',models[index].image);

    document.querySelector('.card-link').setAttribute('href',models[index].link);
    
}


function init(settings) {
    var prev;
    interval= setInterval(function() {
        
        if (settings.random) {
            //random index
            do{
                index=Math.floor(Math.random()*slaytCount);
            }while (index==prev) {
                prev= index;    
            }
        }else{
            //artan index
            if (slaytCount==index+1) {
                index=-1;
            }
            showSlide(index);
            console.log(index);
            index++;
        }
        showSlide(index);
    },settings.duration)
}




