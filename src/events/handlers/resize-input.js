/**
* (C) Copyright IBM Corp. 2016. All Rights Reserved.
*
* Licensed under the Apache License, Version 2.0 (the "License"); you may not use this file except
* in compliance with the License. You may obtain a copy of the License at
*
* http://www.apache.org/licenses/LICENSE-2.0
*
* Unless required by applicable law or agreed to in writing, software distributed under the License
* is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express
* or implied. See the License for the specific language governing permissions and limitations under
* the License.
*/

var state = require('../../state');
var events = require('../../events');

function resizeInput() {
  var current = state.get();
  var maxInputPercentage = 35;
  setTimeout(function() {
    var maxInputHeight = (window.getComputedStyle(current.root).getPropertyValue('height').replace('px', '')) * (maxInputPercentage / 100);
    maxInputHeight = (maxInputHeight > 96) ? maxInputHeight : 96;
    if (maxInputHeight !== current.inputHeight) {
      var cloneHeight;
      console.log('current.input.value', current.input.value);
      current.inputClone.innerHTML = (current.input.value && current.input.value.length > 0) ? current.input.value.replace(/\n/g, '<br />') : 'Enter message...';
      setTimeout(function() {
        cloneHeight = window.getComputedStyle(current.inputClone).getPropertyValue('height').replace('px', '');
        if (cloneHeight !== current.inputHeight) {
          var inputHeight = (maxInputHeight > cloneHeight) ? cloneHeight : maxInputHeight;
          current.input.style.overflow = 'hidden';
          state.set({
            inputHeight: inputHeight
          });
          current.input.style.height = inputHeight + "px";
          events.publish('resize');
        }
      }, 10);
    } else {
      current.input.style.overflow = 'auto';
    }
  }, 10);
}

module.exports = resizeInput;
