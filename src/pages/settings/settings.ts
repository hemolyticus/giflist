import { Component } from '@angular/core';
import { ViewController, NavParams } from 'ionic-angular';

/*
  Generated class for the Settings page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {

    //Variables
    perPage:number;
    sort:string;
    subreddit:string;


    //Constructor
  constructor(public view: ViewController, public navParams: NavParams)
  {

      this.perPage = this.navParams.get('perPage');
      this.sort= this.navParams.get('sort');
      this.subreddit = this.navParams.get('subreddit');

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SettingsPage');
  }

  //Functions

    save():void
    {
        let settings =
            {
                perPage: this.perPage,
                sort: this.sort,
                subreddit: this.subreddit

            };

        this.view.dismiss(settings);
    }


    close(): void
    {

        this.view.dismiss();

    }




}
