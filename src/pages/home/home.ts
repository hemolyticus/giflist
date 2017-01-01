import { Component } from '@angular/core';
import { ModalController, Platform } from 'ionic-angular';
import { Keyboard } from 'ionic-native';
import { SettingsPage } from '../settings/settings';
import { Data } from '../../providers/data';
import { Reddit } from '../../providers/reddit';
import { FormControl } from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})


export class HomePage {

    //Variables
    subredditValue:string;
    subredditControl: FormControl;

    //Constructor
    constructor(public dataService: Data, public redditService: Reddit, public modalCtrl: ModalController, public platform:Platform)
    {

        this.subredditControl = new FormControl();

    }

    ionViewDidLoad()
    {
        this.subredditControl.valueChanges.debounceTime(1500).distinctUntilChanged().subscribe
        (

            subreddit =>
            {

                if (subreddit != '' && subreddit)
                {

                    this.redditService.subreddit = subreddit;
                    this.changeSubreddit();
                    Keyboard.close();

                }

            }

        );

        this.platform.ready().then(()=>
        {
            this.loadSettings();
        });
    }


    //Methods

    loadSettings():void
    {

        console.log("TODO: Implement loadSettings()");

    }

    showComments(post):void
    {

        console.log("TODO: Implement showComments()");

    }

    openSettings(): void
    {

        console.log("TODO: Implement openSettings()");

    }

    playVideo(e, post):void
    {

        console.log("TODO: Implement playVideo()");

    }

    changeSubreddit(): void
    {

        console.log("TODO: Implement changeSubreddit()");

    }

    loadMore(): void
    {
        console.log("TODO: Implement loadMore()");

    }



}
