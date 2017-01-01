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
import { InAppBrowser } from 'ionic-native';

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

        this.redditService.fetchData();

    }

    showComments(post):void
    {

        let browser = new InAppBrowser('http://reddit.com' + post.data.permalink, '_system');

    }

    openSettings(): void
    {

        let settingsModal = this.modalCtrl.create(SettingsPage,
            {

                perPage: this.redditService.perPage,
                sort: this.redditService.sort,
                subreddit: this.redditService.subreddit

            });

        settingsModal.onDidDismiss(settings =>
        {

            if (settings)
            {

                this.redditService.perPage = settings.perPage;
                this.redditService.sort = settings.sort;
                this.redditService.subreddit = settings.subreddit;

                this.changeSubreddit();

            }

        });

        settingsModal.present()

    }

    playVideo(e, post):void
    {

        let video = e.target;

        if (!post.alreadyLoaded)
        {
            post.showLoader = true;
        }

        if (video.paused)
        {
            video.play();

            video.addEventListener("playing", function(e){
                post.showLoader = false;
                post.alreadyLoaded = true;
            });
        }
        else
        {
            video.pause();

        }

    }

    changeSubreddit(): void
    {

        this.redditService.resetPosts();
    }

    loadMore(): void
    {
        this.redditService.nextPage();

    }



}
