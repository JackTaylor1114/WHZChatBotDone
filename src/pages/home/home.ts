import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

/* Class representing the Home page */
export class HomePage {

  messages = [];
  message = '';
  configUrl ='https://api.dialogflow.com/v1/query?v=20150910';


  constructor(private http: HttpClient) {}

  /* onClick-Method for 'Ask'-button */
  sendMessage()
  {
    //Create a new message with the text from the input field and push it to the list of messages
    this.messages.push(new Message(this.message, true));

    //Build HTTP Header for request with authorization code and content type name
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer 09d5cd544cda41bbafc2159cf462a7a7'
      })
    };

    //Build the request URL and append the user input
    let request = this.configUrl+"&lang=en&sessionId=12345&query="+this.message;

    //Do HTTP GET and create a new message with the result from the bot and push it to the list of messages
    this.http.get(request, httpOptions).subscribe((result) => {
      this.messages.push(new Message((result as any).result.fulfillment.speech, false));
    });

    //Clear the input value
    this.message = '';
  }
}

/* Class representing a Message */
export class Message {

  text = '';
  from_you =  true;

  constructor(message, from_you) {
    this.text = message;
    this.from_you = from_you;
  }
}
