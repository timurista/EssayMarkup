'use strict';

/**
 * @ngdoc overview
 * @name essayMarkupV1App
 * @description
 * # essayMarkupV1App
 *
 * Main module of the application.
 */
angular
  .module('essayMarkupV1App', [
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'textAngular',
    'GradeService'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl'
      })
      .when('/about', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl'
      })
      .when('/gradedPapers', {
        templateUrl: 'views/gradedPapers.html',
        controller: 'GPCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  })
  .factory('Data', function() {
    //shared data
    return {
      text: 'Homer’s The Odyssey is one of the best, if not the best, historical epic of all time. Filled with action, adventure and romance, the poem has entertained for generations. However, no story (especially one that is over 400 pages long) can pass along without a few forms of “lubrication” to help everything. Xenia is one such “lubricant”. Basically, what this means is: the events in the Odyssey couldn’t have happened the way they did without the Greek custom of Xenia. '+'Now, what is Xenia? It would appear that Xenia started long before the setting of the Odyssey. Originally, the custom was adopted, "As early as 55,000 B.C.E., [by] nomadic humans...(Sienkewicz)." as a way to make hunting, gathering, and lodging easier by families grouping together. It was sort of like mini-community building at the time. This is where Xenia begins to emerge. For a while, it was dangerous for anyone to leave or travel to other "communities” of nomads, as the travelers were often treated with immediate hostility. But over time, it was accepted that a stranger who took up the offer of food, lodging, or protection from another, would have to reciprocate somewhere in the near future. Even in ancient times Xenia helped people on both ends of the process. In short: Xenia equals Greek hospitality.'+'Think how difficult it would be for Odysseus to even begin to journey home if nobody was cooperative. For example, remember the time after an exhausted Odysseus washes up on the shores of the island, Scheria. Athena, still following and helping Odysseus on his way home, enters the island’s city to look for help. Disguising herself as a friend of the beautiful princess Nausikaa, the goddess convinces her to go wash her linens down at the stream the next day. Little does she know that this is where our Odysseus is taking a nap. When Odysseus hears Nausikaa and her maids coming, he emerges from behind the bush he has been behind. He tells his story to the princess, and begs for assistance. The maids are shocked. But Nausikaa remains calm and eloquently explains to them, “ ‘Stop, girls, why do you shun the sight of a man? Surely you don’t imagine he’s unfriendly? There will never be mortal man so contrary as to set hostile feet on Phaiakian land, for we are dear to the gods. We live far-off, over the turbulent sea, the remotest of races, and deal with no other peoples. This man must instead be some luckless wanderer, landed here. We must care for him, since all strangers and beggars come from Zeus, and even a little gift is welcome. So bring him food and drink, girls, and bathe him in the river wherever there’s shelter from the wind (Lattimore).’ ” This is really quite extraordinary kindness to such a large, hairy stranger. However, Odysseus would never have come close to Ithaka without this simple act of kindness, because later on, Nausikaa gives Odysseus a tip on how he can get home. Apparently he ought to enter the city and go to her parents’ palace. Once inside he must “Stride by [my father], and throw your arms around my mother’s knees, if you want see the day of your return come quickly and joyfully, no matter how far away your home may be. If you win her favour, you may hope to see your friends, and reach your fine house in your own country (Lattimore).’ ” Odysseus does, and is later granted a trip back home (Odyssey).'+'And even besides Odysseus, if Xenia wasn’t used by other characters, the story would be as kaput as ever. For example, when Telemachus sees Athena (Disguised as Mentor), and goes, “straight to the forecourt, the heart within him scandalized that a guest should still be standing at the doors. He stood beside her and took her by the right hand, and relieved her of the bronze spear, and spoke to her and addressed her in winged words: \'Welcome, stranger. You shall be entertained as a guest among us. Afterward, when you have tasted dinner, you shall tell us what your need is.\' […] [A]nd he led her and seated her in a chair, with a cloth to sit on, the chair splendid and elaborate. For her feet there was a footstool. For himself, he drew a painted bench next her, apart from the others, the suitors, for fear the guest, made uneasy by the uproar, might lose his appetite there among overbearing people (Homer)”. What his means is, Telemachus immediately gets Athena a seat away from the suitors, and brings her a footstool. He even says something along the lines of, “Hello stranger! We’ll entertain you like one of our own kin, and afterwards, discuss your every whim!” Could it be that this was a test for Telemachus devised by Athena? Is this why the goddess aids the young hero throughout the story? If so, then without Telemachus exhibiting Xenia, it is possible that there would be no story! Athena might’ve never even helped Odysseus in the first place.'+'So in conclusion, Xenia is basically an age-old form of Greek hospitality. While it may seem like just a useless custom with no significant value, just remember that the process had to happen to help a man get home to his family after twenty long years. Without Xenia, The beautiful princess Nausikaa wouldn\'t have given information to Odysseys that helped his return. Or, if the hero’s son, Telemachus hadn\'t shown habitual Xenia to a powerful goddess in disguise, it’s very plausible that same goddess wouldn\'t have helped his father in numerous ways throughout the tale. In short, you\'ve got to have Xenia.'
      }        
    });
