import { Component, OnInit } from '@angular/core';

 function activateModal() {
    // initialize modal element
     var options = {
    'keyboard': true, // teardown when <esc> key is pressed (default: true)
    'static': true, // maintain overlay when clicked (default: false)
    'onclose': function() {} // execute function when overlay is closed
  };
  
    var modalEl = document.createElement('div');
    modalEl.style.width = '400px';
    modalEl.style.height = '300px';
    modalEl.style.margin = '100px auto';
    modalEl.style.backgroundColor = '#fff';
     modalEl.className = 'mui-panel';
     var form = document.createElement('form');
     form.className = 'mui-form';
     modalEl.appendChild(form);
     var div1 = document.createElement('div');
     div1.className = 'mui-textfield';
     form.appendChild(div1);
     
     var input = document.createElement("input");
     input.type = 'text';
     input.setAttribute("required","");
     input.placeholder = 'enter effect';
     div1.appendChild(input);
     
     var div2 = document.createElement('div');
     div2.className = 'mui-textfield';
     form.appendChild(div2);
     
     var sev = document.createElement("input");
     sev.type = 'text';
     sev.setAttribute("required","");
     sev.placeholder = 'enter severity';
     div2.appendChild(sev);
     
     var btn = document.createElement('button');
     btn.className = 'mui-btn--raised';
     btn.value = 'Submit';
     btn.innerHTML = 'Submit';
     form.appendChild(btn);

    // show modal
    //mui.overlay('on', options, modalEl);

  }
  
@Component({
  selector: 'app-effects',
  templateUrl: './effects.component.html',
  styleUrls: ['./effects.component.css']
})
export class EffectsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onClick() {
      activateModal();
  }
}
