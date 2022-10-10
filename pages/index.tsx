import type { NextPage, NextPageContext } from "next";
import Head from "next/head";
import MainPage from "../src/components/MainPage/MainPage";
import ApiService from "../src/services/ApiService";
import { Article, SearchArticlesResponse } from "../src/types/Article";

const NEWS_COUNTRY = "ru";
const NEWS_ON_PAGE = 50;

const MOCK = [
  {
    source: { id: null, name: "Ura.news" },
    author: null,
    title: "Евросоюз изменил подход к санкциям против России - URA.RU",
    description: "Читайте на URA.RU",
    url: "https://ura.news/news/1052593641",
    urlToImage:
      "https://s.ura.news/images/news/upload/smm/2022/10/10/facebook_9b064fe0b2c40f6affe0946659175cb2.jpg",
    publishedAt: "2022-10-10T02:54:00Z",
    content:
      "—     , .  ,   .\r\n" +
      "«  180 ,         », — EuTradeDefense .  . ,    ,    ,   .\r\n" +
      " 6 , 360.   ,     , Life\r\n" +
      ".    , - ,   , « ». \r\n" +
      "      .   ,       .",
  },
  {
    source: { id: null, name: "Www.eg.ru" },
    author: "Руслана Алексеева",
    title:
      "«Ты верная и настоящая. Я тебя за это люблю»: что Никулин сказал Гурченко перед смертью - Экспресс газета",
    description:
      "Звезды советского кино Людмила Гурченко и Юрий Никулин были очень близки. Артистка называла старшего товарища папой. «Когда у меня бывали серые дни, когда я начинала беспричинно нервничать, это был точный признак, — целую неделю не звонил Ю.В.» — признавалась…",
    url: "https://www.eg.ru/nostalgia/2632402-ty-vernaya-i-nastoyashchaya-ya-tebya-za-eto-lyublyu-chto-nikulin-skazal-gurchenko-pered-smertyu/",
    urlToImage:
      "https://s3.cdn.eg.ru/wp-content/uploads/2022/10/lyudmila-gurchenko-i-yuriy-nikulin051232-1024x512.jpg",
    publishedAt: "2022-10-10T01:30:02Z",
    content:
      "« » 1976 . .\r\n" +
      "« . , . « » . , », .\r\n" +
      ". , . , .\r\n" +
      " , , . , , . .\r\n" +
      " . , , . , . , .\r\n" +
      "« , ... , - ... ... &lt;&gt; 5 . . ...» .\r\n" +
      ". . 3040 . 16 . , . 21 1997 75 . . , .\r\n" +
      " : Legion-media",
  },
  {
    source: { id: null, name: "Teleprogramma.pro" },
    author: "Юлия Филатова",
    title:
      "В Госдуме объяснили, почему Пугачева недостойна звания народной артистки - TELEPROGRAMMA.PRO",
    description:
      "Артистка уехала из страны во второй раз, громко хлопнув дверью.",
    url: "https://teleprogramma.pro/news/v-gosdume-obyasnili-pochemu-pugacheva-nedostoyna-zvaniya-narodnoy-artistki_nid4346047_au73727au_cr73727cr#article",
    urlToImage:
      "https://teleprogramma.pro/sites/default/files/styles/post_850x666/public/text-images/2022-10/a_pugacheva_glob_1665359643_1665359774.jpg?itok=gGmVFJ7O",
    publishedAt: "2022-10-09T23:53:41Z",
    content: ", . «» YouTube .« , . , , . ? . . , . . . », .",
  },
  {
    source: { id: null, name: "Ura.news" },
    author: null,
    title:
      "«Ведомости»: переговоры Путина и главы МАГАТЭ Гросси могут пройти на этой неделе - URA.RU",
    description: "Читайте на URA.RU",
    url: "https://ura.news/news/1052593630",
    urlToImage:
      "https://s.ura.news/images/news/upload/smm/2022/10/10/facebook_0fc896c29a2c46c855e741e19fea48f4.jpg",
    publishedAt: "2022-10-09T23:18:00Z",
    content:
      "()   .   «»,   ,   .\r\n" +
      " ,      10  16 .   ,  - 11 . ,   , ,   .\r\n" +
      " ,   ().   ,   ,    .\r\n" +
      ",          ,  23  27 .     . , . «» ,   .",
  },
  {
    source: { id: null, name: "Ura.news" },
    author: null,
    title:
      "Член совета при Путине: страны Запада хотят вынудить РФ пойти на уступки по Украине - URA.RU",
    description: "Читайте на URA.RU",
    url: "https://ura.news/news/1052593623",
    urlToImage:
      "https://s.ura.news/images/news/upload/smm/2022/10/10/facebook_359873b863c28fe822700b731f4675ef.jpg",
    publishedAt: "2022-10-09T22:37:00Z",
    content:
      '= 10000 || end"\r\n' +
      "&gt;\r\n" +
      ": \r\n" +
      "     .       .\r\n" +
      "«, .    -  », — . «».\r\n" +
      " -       .   ,    .    ,   « »  .\r\n" +
      "     .       . «, .    -  », — . «». -       .   ,    .    ,   « »  .",
  },
  {
    source: { id: null, name: "Korrespondent.net" },
    author: "Олена Буркало",
    title: "Число жертв ударов РФ по Запорожью увеличилось - Корреспондент",
    description:
      "В больнице скончался пострадавший при обстрелах 6 октября, а под завалами разрушенного накануне дома нашли уже 14 тел.",
    url: "https://korrespondent.net/ukraine/4524231-chyslo-zhertv-udarov-rf-po-zaporozhui-uvelychylos",
    urlToImage: "https://kor.ill.in.ua/m/190x120/2774668.jpg",
    publishedAt: "2022-10-09T21:56:00Z",
    content:
      ", 9 , 14 . . .\r\n" +
      '" 14 . , . . 70 , 11 . . . - -22 - ", - .\r\n' +
      ", 6 . , 20.\r\n" +
      '"65 : 32 , 20 13 ", - .\r\n' +
      ", 22 . 87 , 55 .\r\n" +
      " .net  Telegram.  https://t.me/korrespondentnet",
  },
  {
    source: { id: "google-news", name: "Google News" },
    author: null,
    title:
      "Медведев заявил, что РФ ответит на теракт на Крымском мосту уничтожением террористов - Интерфакс",
    description: null,
    url: "https://news.google.com/__i/rss/rd/articles/CBMiJWh0dHBzOi8vd3d3LmludGVyZmF4LnJ1L3J1c3NpYS84NjcwNTnSAQA?oc=5",
    urlToImage: null,
    publishedAt: "2022-10-09T21:17:00Z",
    content: null,
  },
  {
    source: { id: null, name: "Sportmail.ru" },
    author: "Спорт Mail.ru",
    title:
      "Футболист «Краснодара» забил самый быстрый гол в истории РПЛ - Спорт Mail.ru",
    description:
      "Нигерийский нападающий «Краснодара» Олакунле Олусегун установил рекорд Российской премьер-лиги (РПЛ). Об этом сообщается в Telegram-канале чемпионата страны.",
    url: "https://sportmail.ru/news/football-rus-premier/53408606/",
    urlToImage:
      "https://news.mail.ru/social_preview/53408606/sport/?time=3bc7b180c7431eeda39fe6f5e1854e03",
    publishedAt: "2022-10-09T21:04:13Z",
    content:
      "«» 20-   .     .  — «» ,   «»    2012 .\r\n" +
      "9  «» «»   12- .       3:2.\r\n" +
      "«» 21     .   15  «».",
  },
  {
    source: { id: null, name: "Motor.ru" },
    author: "Сергей Ильин",
    title:
      "В Китае забыли на стоянке сотни новых Great Wall, и вот почему - Motor.ru",
    description:
      "В Китае забыли на стоянке сотни почти новых электромобилей Great Wall. Пользователь социальной сети Weibo показал закрытую площадку с несколькими рядами брошенных Ora iQ5. На машинах отсутствуют номера, кузова покрыты песком и пылью, при этом механических пов…",
    url: "https://motor.ru/news/ora-iq5-abandoned-china-09-10-2022.htm",
    urlToImage:
      "https://motor.ru/imgs/2022/10/09/20/5619035/ce734c4a76b38273d638498a83b36a0073f064ea.jpg",
    publishedAt: "2022-10-09T20:59:00Z",
    content:
      "Ora iQ5 , 2021 130 ( 18 ), Great Wall .\r\n" +
      " : , , , «» , iQ5 . - iQ5 2020 .",
  },
  {
    source: { id: null, name: "Www.eg.ru" },
    author: "Ярослав Григорьев",
    title:
      "Вдова Кобзона рассказала об изменениях во внешности Моисеева перед смертью - Экспресс газета",
    description:
      "Нелли Кобзон сообщила, что незадолго до кончины эпатажный исполнитель «Голубой луны» сильно поправился. Возможно, именно из-за этого он стеснялся выходить в свет.",
    url: "https://www.eg.ru/showbusiness/2640152-vdova-kobzona-rasskazala-ob-izmeneniyah-vo-vneshnosti-moiseeva-pered-smertyu/",
    urlToImage:
      "https://s4.cdn.eg.ru/wp-content/uploads/2022/09/lgn61384216064926-1024x512.jpg",
    publishedAt: "2022-10-09T20:30:13Z",
    content:
      ". « » 69- . , 12 . 2010 , , . , , . « !» , . , .\r\n" +
      "« ! ..», « !».\r\n" +
      ", . , . , . .\r\n" +
      ", , . , . , - .\r\n" +
      "« ! ... », .",
  },
  {
    source: { id: null, name: "Sport-express.ru" },
    author: "Руслан Минаев",
    title:
      "«Манчестер Юнайтед» обыграл «Эвертон». Роналду забил первый гол в этом сезоне АПЛ - Спорт-Экспресс",
    description:
      "«Манчестер Юнайтед» в гостях обыграл «Эвертон» в матче 10-го тура чемпионата Англии — 2:1.",
    url: "https://www.sport-express.ru/football/england/news/everton-manchester-yunayted-1-2-rezultat-matcha-chempionata-anglii-9-oktyabrya-2022-goda-1983501/",
    urlToImage:
      "https://ss.sport-express.ru/userfiles/materials/182/1825079/large.jpg",
    publishedAt: "2022-10-09T19:53:00Z",
    content:
      "-.\r\n" +
      "«- », , \r\n" +
      " 77 77886 10.02.2020.\r\n" +
      "«-». .. \r\n" +
      " 18 .\r\n" +
      "1991 . © «-», 19912022.",
  },
  {
    source: { id: null, name: "Kommersant.ru" },
    author: null,
    title: "Тяжело в бою — легко без учений - Коммерсантъ",
    description: "Почему Бишкек отменил маневры ОДКБ",
    url: "https://www.kommersant.ru/doc/5606401",
    urlToImage:
      "https://iv.kommersant.ru/SocialPics/5606401_26_2278643_2067720363",
    publishedAt: "2022-10-09T19:38:40Z",
    content:
      "- () « -2022». - . , - . , , .\r\n" +
      " - « -2022» . , , 2012 , 10 14 «» , , , , , , , , .\r\n" +
      " , - , . « ? ? ? , , , », .\r\n" +
      " , . \r\n" +
      "«, , , », - . , .\r\n" +
      '« , 10 . , 700 . . " " », . , , , « ».\r\n' +
      ", . . . 63 198 , 41… [+290 chars]",
  },
  {
    source: { id: null, name: "Ura.news" },
    author: null,
    title:
      "Минтранс РФ: на Крымском мосту запустили движение пригородных поездов - URA.RU",
    description: "Читайте на URA.RU",
    url: "https://ura.news/news/1052593602",
    urlToImage:
      "https://s.ura.news/images/news/upload/smm/2022/10/10/facebook_88be3079634d84a3919e8ddf13d7b12f.jpg",
    publishedAt: "2022-10-09T19:12:00Z",
    content:
      '= 10000 || end"\r\n' +
      "&gt;\r\n" +
      ": \r\n" +
      "  ,  .   .\r\n" +
      "«       ,   . », —   ,  telegram- .\r\n" +
      " ,   ,   ,   — .   ,   .\r\n" +
      "   8 .   . , ,   .   ,  .     ,     .       .\r\n" +
      "  ,  .   . «       ,   . », —   ,  telegram- . ,  … [+64 chars]",
  },
  {
    source: { id: null, name: "Championat.com" },
    author: "Айнур Шаймарданов",
    title:
      "Турнирная таблица РПЛ: «Зенит» — лидер, «Спартак» — в тройке, «Динамо» продолжает падение - Чемпионат",
    description:
      "Сегодня, 9 октября, завершился 12-й тур в Российской Премьер-Лиге. На первой строчке остаётся «Зенит» (30 очков), который в этом туре сыграл вничью с «Факелом» (1:1) в гостях. В тройку лучших команд лиги входят также «Ростов», одержавший волевую победу над «К…",
    url: "https://www.championat.com/football/news-4848925-turnirnaya-tablica-rpl-zenit-lider-spartak-v-trojke-dinamo-prodolzhaet-padenie.html",
    urlToImage: "https://img.championat.com/news2/social/9/8a/4848925.jpg",
    publishedAt: "2022-10-09T19:08:01Z",
    content:
      ", 9 , 12- -. «» (30 ), «» (1:1) . «», «» (3:2) «», « » (5:2). 25 .\r\n" +
      " «» (1:1) 24 . «» (21). «» (20) , «» 4:0. «» (18), «» (17), «» . \r\n" +
      "« » (13), «», 10-. « » (11). «» (10), «» 12- .\r\n" +
      "«» (10) «» (9). … [+13 chars]",
  },
  {
    source: { id: null, name: "Kommersant.ru" },
    author: null,
    title:
      "Погранкомитет Белоруссии: Украина взорвала почти все мосты на границе - Коммерсантъ",
    description: "Подробнее на сайте",
    url: "https://www.kommersant.ru/doc/5606453",
    urlToImage: "https://im.kommersant.ru/SocialPics/5606453_26_0_1022322330",
    publishedAt: "2022-10-09T18:54:31Z",
    content:
      ", , . \r\n" +
      "« , , , »,— ( «»). \r\n" +
      " , - , . , « ». « . »,— .\r\n" +
      ", 15 . . , .\r\n" +
      " , 228- , - «».\r\n" +
      ":",
  },
  {
    source: { id: null, name: "Motor.ru" },
    author: "Сергей Ильин",
    title: "Ford сообщил об ажиотажном спросе на новый Maverick - Motor.ru",
    description:
      "Ford сообщил об ажиотажном спросе на новый Maverick. Менее чем за неделю «голубой овал» получил 86 тысяч предзаказов, причём по данным пресс-службы компактный и дешевый пикап привлёк покупателей, которые раньше не были знакомы ни с сегментом грузовичков, ни с…",
    url: "https://motor.ru/news/ford-maverick-sales-09-10-2022.htm",
    urlToImage:
      "https://motor.ru/imgs/2022/10/09/17/5618960/94b1cb0d8c16b354af79dc01cad7c8fe12f59514.jpg",
    publishedAt: "2022-10-09T18:21:00Z",
    content:
      "iseecars.com , - Ford , , . Maverick , , .\r\n" +
      " Ford , 2022 , Maverick. , 1000 , 5,3 100 .",
  },
  {
    source: { id: null, name: "Zona.media" },
    author: null,
    title:
      "Путин назвал терактом подрыв Крымского моста и обвинил украинские спецслужбы - Медиазона",
    description:
      "Президент Владимир Путин назвал терактом подрыв Крымского моста и обвинили в этом украинские спецслужбы. Его слова приво...",
    url: "https://zona.media/news/2022/10/09/putin",
    urlToImage: "https://s3.zona.media/a087f9d12d34fbf61b609f895ca754ad.jpg",
    publishedAt: "2022-10-09T17:29:00Z",
    content:
      ". «», «».\r\n" +
      "« . , . , , », . \r\n" +
      " , . \r\n" +
      ", 2 205 (). , . \r\n" +
      " , : « , .  &lt;...&gt; , , ».\r\n" +
      " 8 . , . , « ». . \r\n" +
      "25",
  },
  {
    source: { id: null, name: "DW (English)" },
    author: "Александра Иванова",
    title:
      'Полиция ФРГ начала расследование по утечкам на "Северных потоках" - DW НА РУССКОМ',
    description:
      'К датскому острову Борнхольм отправились два корабля ВМС ФРГ с водолазами, которые должны задокументировать повреждения труб газопроводов "Северный поток" и "Северный поток - 2".',
    url: "https://www.dw.com/ru/policia-frg-nacala-rassledovanie-po-uteckam-na-severnyh-potokah/a-63384788",
    urlToImage: "https://static.dw.com/image/63384773_6.jpg",
    publishedAt: "2022-10-09T16:52:56Z",
    content:
      ', " "" - 2". , 9 , - WDR NDR , , , , .\r\n' +
      ' ,  (Dieter Romann) " " " " - 2".\r\n' +
      ' " - () " .\r\n' +
      ",   : -  Dillingen Mittelgrund. 7 - - , .   , .\r\n" +
      ' " "\r\n' +
      ' , " ". - . , .\r\n' +
      " (Marco Buschmann) Bild am Sonntag 2 , … [+123 chars]",
  },
  {
    source: { id: null, name: "F1news.ru" },
    author: null,
    title:
      "Чемпионская пресс-конференция Макса Ферстаппена - Формула 1 на F1News.Ru",
    description:
      "После финиша в Гран При Японии Макс Ферстаппен провёл специальную пресс-конференцию уже в качестве чемпиона мира 2022 года...",
    url: "https://www.f1news.ru/interview/max_verstappen/163539.shtml",
    urlToImage: "https://cdn.f1ne.ws/userfiles/max_verstappen/163539.jpg",
    publishedAt: "2022-10-09T14:34:00Z",
    content:
      ", , - 2022 .\r\n" +
      ": . , , , ? : , . , - . , , . , , .\r\n" +
      " -. , , . , . .\r\n" +
      ", - , , . - . , , , .\r\n" +
      ": , , Honda? : . , , Honda, , , , .\r\n" +
      " Honda, , , , . , , , .\r\n" +
      ", , 2022- . - Honda, .\r\n" +
      " , , , , . Honda , , ,… [+1021 chars]",
  },
  {
    source: { id: null, name: "3dnews.ru" },
    author: null,
    title:
      "Меньше, тише и дешевле: Microsoft выпустила вторую версию мини-холодильника в виде Xbox Series X - 3DNews",
    description:
      "Корпорация Microsoft выпустила вторую версию мини-холодильника в стиле Xbox Series X.",
    url: "https://3dnews.ru/1075486/menshe-tishe-i-deshevle-microsoft-vipustila-vtoruyu-versiyu-miniholodilnika-v-vide-xbox-series-x",
    urlToImage:
      "https://3dnews.ru/assets/external/illustrations/2022/10/09/1075486/Xbox-mini-fridge_1.jpg",
    publishedAt: "2022-10-09T14:19:00Z",
    content:
      "Microsoft - Xbox Series X. - Xbox (Aaron Greenberg). Walmart.\r\n" +
      ": Walmart\r\n" +
      "- Walmart $79. , . — 8 . , .\r\n" +
      " Mini-Me Xbox Series X Mini Fridge 4,5 . . 2 . USB- (5 2,1 ) .\r\n" +
      "- - . , $99.",
  },
  {
    source: { id: null, name: "Kommersant.ru" },
    author: null,
    title: "Фондовый листопад - Коммерсантъ",
    description: "Что принесли инвесторам ПИФы в сентябре 2022 года",
    url: "https://www.kommersant.ru/doc/5605724",
    urlToImage:
      "https://iv.kommersant.ru/SocialPics/5605724_26_2278572_295323576",
    publishedAt: "2022-10-09T13:00:19Z",
    content:
      ". InvestFunds, . , - . . , .\r\n" +
      ". , Investfunds, 113 ( 500  .) . 85 10%, 18 2028%. , 3041%, . , 1018%. , .\r\n" +
      " , . 2028%. : , ; , . Brent 10%. « , , », «» .\r\n" +
      " , , . 18%, 2 . , 2017 . , , 1719%. . , «» .\r… [+185 chars]",
  },
  {
    source: { id: null, name: "Fontanka.ru" },
    author: null,
    title:
      "«Наилучший подход». Посол Китая в США поблагодарил Илона Маска за идею решения «Тайваньского вопроса» - Фонтанка.Ру",
    description:
      "Посол Китая в США Цинь Ган поблагодарил американского предпринимателя Илона Маска за предложение сделать Тайвань специальным административным районом КНР по примеру Гонконга.",
    url: "https://www.fontanka.ru/2022/10/09/71721506/",
    urlToImage:
      "https://static.ngs.ru/news/2015/social/7bba8d5347995839032f64d80e8988.png",
    publishedAt: "2022-10-09T11:42:09Z",
    content: "«» -, , , , . , -, , , , . , , , , , - . - «»! , , .",
  },
  {
    source: { id: null, name: "Igromania.ru" },
    author: null,
    title:
      "Действие Deathloop и Dishonored действительно происходит в одной вселенной - Игромания онлайн",
    description: "Bethesda даже представила специальный арт в честь анонса.",
    url: "https://www.igromania.ru/news/119850/Deystvie_Deathloop_i_Dishonored_deystvitelno_proishodit_v_odnoy_vselennoy.html",
    urlToImage:
      "https://cdn.igromania.ru/mnt/news/4/8/1/3/5/6/119850/caded767a827c129_1200xH.jpg",
    publishedAt: "2022-10-09T08:42:00Z",
    content:
      "18+: 77-83780\r\n" +
      " 19 2022 ., \r\n" +
      ": ..\r\n" +
      ": «-»2003-2022 «-». ..\r\n" +
      ":CrowdRepublic .«» , , , .",
  },
  {
    source: { id: null, name: "Primamedia.ru" },
    author: null,
    title:
      "Овнам придется импровизировать, а Львам выяснять отношения: гороскоп на 10 октября - PrimaMedia",
    description: "Что преподнесет этот осенний день, рассказали астрологи",
    url: "https://primamedia.ru/news/1372996/",
    urlToImage:
      "https://primamedia.ru/f/main/3245/3244881.png?85d9105f7aa3ec8c257c612b80ff2a0c",
    publishedAt: "2022-10-09T07:49:54Z",
    content:
      ", , . , . \r\n" +
      " . : , . .\r\n" +
      " . , , . .\r\n" +
      " , , - . . . \r\n" +
      " . , , . , , - . \r\n" +
      " . . , . .\r\n" +
      " , . . . \r\n" +
      " , , . . , . .\r\n" +
      " : , , . , . . \r\n" +
      " . . . .\r\n" +
      " , , . - , , . \r\n" +
      " . . , . .\r\n" +
      " AstroZodiac. \r\n" +
      "© 20052022 PrimaMe… [+6 chars]",
  },
  {
    source: { id: null, name: "Playground.ru" },
    author: "butcher69",
    title:
      "Хидео Кодзима опубликовал фотографии Эль Фаннинг со съемочной площадки новой игры - PlayGround.ru",
    description:
      "Хидео Кодзима опубликовал несколько фотографий, на которых запечатлена Эль Фаннинг, актриса, которая всего несколько дней назад была официально представлена в качестве члена актерского состава новой игры Kojima Productions, в действии на площадке захвата движ…",
    url: "https://www.playground.ru/death_stranding_2/news/hideo_kodzima_opublikoval_fotografii_el_fanning_so_semochnoj_ploschadki_novoj_igry-1238964",
    urlToImage:
      "https://i.playground.ru/e/XMxBvv0ByLbQCNb0CVMcbg.jpeg?600xauto",
    publishedAt: "2022-10-09T07:20:07Z",
    content:
      ", , , Kojima Productions, , , Death Stranding 2.\r\n" +
      " , Death Stranding 2, . , , , , .\r\n" +
      ' , Kojima Productions , . , , "Where Am I" , , , .\r\n' +
      " , Kojima Productions , Death Stranding 2.",
  },
  {
    source: { id: null, name: "Unian.net" },
    author: "Наталья Хаджи",
    title:
      "Уничтожены более 80 оккупантов и пункт управления: стало известно о новых достижениях ВСУ на юге - УНИАН",
    description: "Наша авиация нанесла ряд ударов по опорным пунктам врага.",
    url: "https://www.unian.net/war/svizhi-vtrati-rosiji-v-ukrajini-na-pivdni-ukrajini-znishcheni-ponad-80-okupantiv-ta-punkt-upravlinnya-12004665.html",
    urlToImage:
      "https://images.unian.net/photos/2022_07/thumb_files/620_324_1658646873-3178.jpg?1",
    publishedAt: "2022-10-09T04:21:00Z",
    content:
      ". / \r\n" +
      "80 , .\r\n" +
      'Facebook "" .\r\n' +
      '" 4 , 10 , , , . - 200 , , 83 , 4 , 4 "-", 2 120- , 7 -", - .\r\n' +
      ' , 7 , , , 2 "", -. 3 1 .\r\n' +
      " 2022 - \r\n" +
      " . , .\r\n" +
      "4 ,  .\r\n" +
      "6 - ,   1 29 .\r\n" +
      " 8 62 . .\r\n" +
      " :",
  },
  {
    source: { id: null, name: "Fontanka.ru" },
    author: null,
    title:
      "Уволили главного тренера московского «Локомотива», 8 октября 2022 г. - 8 октября 2022 - Фонтанка.Ру",
    description:
      "Руководство «Локомотива» уволило спортивного директора Томаса Цорна и главного тренера Йозефа Циннбауэра.",
    url: "https://www.fontanka.ru/2022/10/08/71720870/",
    urlToImage:
      "https://static.ngs.ru/news/2015/social/2dbf5e4a453bf89a497449b64254ba.png",
    publishedAt: "2022-10-08T18:49:05Z",
    content: "«» -, , , , . , -, , , , . , , , , , - . - «»! , , .",
  },
  {
    source: { id: null, name: "Motor.ru" },
    author: "Сергей Ильин",
    title:
      "АвтоВАЗ прекратил производство базовых Lada Granta и повысил цены - Motor.ru",
    description:
      "АвтоВАЗ прекратил производство базовых Lada Granta в исполнении Classic`22: в прайс-листы добавлено новое исполнение Classic`22 Advance с двумя подушками безопасности и расширенным оснащением. Цены выросли: теперь самая дешёвая Granta в кузове седан стоит 749…",
    url: "https://motor.ru/news/granta-classic-advance-08-10-2022.htm",
    urlToImage:
      "https://motor.ru/imgs/2022/10/08/13/5617808/6390a2761c5cef6fcfa8f90dbf5d5e3bfc542eab.jpg",
    publishedAt: "2022-10-08T14:17:00Z",
    content:
      "Classic'22 Advance Classic'22 : «-», USB, SD- Bluetooth.\r\n" +
      " , . , Granta Classic`22 Advance Classic'22 , «» , .",
  },
  {
    source: { id: null, name: "Dtf.ru" },
    author: "Должностной яд",
    title:
      "Игрокам настолько не нравится монетизация Overwatch 2, что некоторые из них начали скучать по лутбоксам из первой части — Игры на DTF - DTF",
    description: "Кто бы мог подумать.",
    url: "https://dtf.ru/games/1386103-igrokam-nastolko-ne-nravitsya-monetizaciya-overwatch-2-chto-nekotorye-iz-nih-nachali-skuchat-po-lutboksam-iz-pervoy-chasti",
    urlToImage: "https://dtf.ru/cover/fb/c/1386103/1665231866/cover.jpg",
    publishedAt: "2022-10-08T12:24:26Z",
    content:
      ".. . , . , , . ? , , , . , 2, 1 , , , . \r\n" +
      "2. , , , - . 4 - . . - . , , . 7% , 20 = 24 , , , . ?",
  },
  {
    source: { id: null, name: "66.ru" },
    author: "66.ru",
    title:
      "Кто поздравил Владимира Путина с 70-летием. Полный список глав государств-друзей президента РФ - 66.RU. Здесь все всё понимают.",
    description:
      "7 октября президент РФ Владимир Путин отметил свое 70-летие. Мы вспомнили и узнали, кто поздравил главу государства в 2012 году на его 60-летие, а кто — сейчас.",
    url: "https://66.ru/news/politic/256880/",
    urlToImage:
      "https://user67902.clients-cdnnow.ru/localStorage/collection/46/ec/1d/22/46ec1d22_resizedScaled_1200to674.png",
    publishedAt: "2022-10-08T04:35:00Z",
    content: ".\r\n, , , . , , , , , , , . , , , , , , , , , , .",
  },
];

interface IProps {
  articles: Article[];
}

const Home: NextPage<IProps> = (props) => (
  <>
    <Head>
      <title>Сайт новостей - Главная</title>
    </Head>
    <MainPage articles={props.articles} />
  </>
);

export const getServerSideProps = async (context: NextPageContext) => {
  const { query } = context.query;
  const fetchUrl = query
    ? `/everything?q=${encodeURIComponent(
        query as string
      )}&pageSize=${NEWS_ON_PAGE}`
    : `/top-headlines?country=${NEWS_COUNTRY}&pageSize=${NEWS_ON_PAGE}`;
  try {
    const { articles } = await ApiService.get<SearchArticlesResponse>(fetchUrl);
    return { props: { articles: articles || [] } };
  } catch (error: any) {
    console.error(error.toString());
    return { props: { articles: [] } };
  }
};

export default Home;
