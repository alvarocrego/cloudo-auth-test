import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Http, Headers } from '@angular/http';
import { HomePage } from '../home/home';
import { TodosProvider } from '../../providers/todos/todos';

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;

  constructor(public navCtrl: NavController, public http: Http, public todoService: TodosProvider, public navParams: NavParams) {
  }



  register(){
 
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    let user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password,
      confirmPassword: this.confirmPassword
    };

    this.http.post('http://192.168.1.47:3000/auth/register', JSON.stringify(user), {headers: headers})
      .subscribe(res => {
        this.todoService.init(res.json());
        this.navCtrl.setRoot(HomePage);
      }, (err) => {
        console.log(err);
      });

}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

}
