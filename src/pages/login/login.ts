import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Headers } from '@angular/http';
import { SignupPage } from '../signup/signup';
import { HomePage } from '../home/home';
import { TodosProvider } from '../../providers/todos/todos';

/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {

  username: string;
  password: string;

  constructor(public navCtrl: NavController, public http: Http, public todoService: TodosProvider, public navParams: NavParams) {
  }

  login(){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let credentials = {
      username: this.username,
      password: this.password
    };

    this.http.post('http://192.168.1.47:3000/auth/login', JSON.stringify(credentials), {headers: headers})
      .subscribe(res => {
        this.todoService.init(res.json());
        this.navCtrl.setRoot(HomePage);
      }, (err) => {
        console.log(err);
      });

}

launchSignup(){
  this.navCtrl.push(SignupPage);
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

}
