import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Information } from 'src/app/models/information.model';
import { InformationService } from 'src/app/shared/information.service';
import { Languages } from 'src/app/types/languages.type';

@Component({
  selector: 'app-home-buttons',
  templateUrl: './home-buttons.component.html',
  styleUrls: ['./home-buttons.component.scss', '../../../../shared/card-display/card-display.component.scss']
})
export class HomeButtonsComponent {

  @Input() language!: Languages;

  constructor (private router: Router, private infoServ: InformationService) {}

  card: any = {
    "name": {"en": "Welcome!", "fr": "Bienvenue !"},
    "flavor": {"en": "Choose left or right", "fr": "Choisi gauche ou droite"},
    "owner": "player",
    "choices": [
        {
            "text": {"en": "Loadout", "fr": "S'équiper"}
        },{
            "text": {"en": "Advanced settings", "fr": "Paramètres avancés"}
        }
    ]
  };

  choiceMade(textSelected: "Loadout" | "Advanced settings"): void {
    if (textSelected === "Advanced settings") this.router.navigate(['/advanced-settings']);
    else this.router.navigate(['/loadout']);
  }

  help(): void {
    let contentFr: string[] = ["Dans Zabi vous incarnez un.e chef.fe de culte commençant son aventure dans la cité de Cindrathar. C’est une cité sombre, pauvre et polluée, où l’eau est une ressource précieuse, peut-être même plus qu’ailleurs, mais c’est là où vous avez le plus de fidèles. Votre magie cohabite avec les rares technologies qui se trouvent ici, dénichées du passé, ou celles qu’on a bricolé à partir de détritus, ou qu’on a volé pour vous.",
    "Votre but est de réaliser suffisamment de rituels pour être prêt.e à accomplir le rituel final qui, selon vous, permettra un renouveau souhaitable pour le monde.",
    "Vous avez donc prévu de vous déplacer de cité en cité, positionnées sur les lignes de confluence de magie, pour réaliser ces rituels.",
    "Pour qu’un rituel fonctionne, vous allez devoir tager (de peinture magique) suffisamment le lieu. Mais malheureusement les forces de l’ordre ne sont pas de cet avis et essayeront de protéger le lieu, le nettoyer, et attaquer vos fidèles. Vous devrez donc en recruter de nouvelleaux, et trouver des endroits pour les protéger.",
    "Choisissez bien vos actions car la réussite du rituel final en dépend."];
    let contentEn: string[] = ["In Zabi you play a cult leader starting their adventure in the city of Cindrathar. It's a dark, poor and polluted city, where water is a precious resource, maybe more than elsewhere, but it's where you have the most followers. Your magic coexists with the rare technologies founded here, those of the past, or those they tinkered from scraps, or they stole for you.",
    "Your goal is to perform enough rituals to be ready to perform the final one that, you believe, will bring a desirable renewal for the world.",
    "You therefore plan to move from city to city, positioned on the confluence lines of magic, to carry out these rituals.",
    "To make a ritual working, you will have to tag (with magic paint) the place sufficiently. But unfortunately the police is not of this opinion and will try to protect the place, clean it, and attack your faithful. You will therefore have to recruit new ones, and find places to protect them.",
    "Choose your actions carefully because the success of the ritual depends on it."];

    this.infoServ.set(new Information(this.language === "fr" ? "Contexte et objectif" : "Background and goal", this.language === "fr" ? contentFr : contentEn));
  }

}
