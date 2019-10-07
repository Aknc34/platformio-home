/**
 * Copyright (c) 2014-present PlatformIO <contact@platformio.org>
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import ReactGA from 'react-ga';
import qs from 'querystringify';


export function inIframe () {
  try {
    return window.self !== window.top;
  } catch (err) {
    return true;
  }
}

export function reportException(description, fatal=false) {
  if (description instanceof ErrorEvent) {
    description = [
      description.message,
      `${description.filename}:${description.lineno}`
    ];
  }
  description = description.toString().replace(/@/g, '_');
  ReactGA.exception({
    description: description.substring(0, 2048),
    fatal
  });
}

export function getStartLocation() {
  let startLocation = null;
  if (window.location && window.location.search) {
    startLocation = qs.parse(window.location.search);
    startLocation = startLocation && startLocation.start ? startLocation.start : null;
  }
  return startLocation || '/';
}

export function getSessionId() {
  let sessionId = null;
  if (window.location && window.location.search) {
    sessionId = qs.parse(window.location.search);
    sessionId = sessionId && sessionId.sid ? sessionId.sid : null;
  }
  return parseInt(sessionId || 0);
}

export function goTo(history, path, state, redirect=false) {
  if (history.length) {
    const lastEntry = history.entries[history.index];
    if (redirect || (lastEntry.pathname === path && JSON.stringify(lastEntry.state) === JSON.stringify(state))) {
      return history.replace(path, state);
    }
  }
  history.push(path, state);
  ReactGA.ga('send', 'screenview', { screenName: path });
}

export function asyncDelay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

export function title(str) {
  return str[0].toUpperCase() + str.slice(1);
}

export function lastLine(text) {
  return text.trim().split('\n').slice(-1)[0];
}

export function cmpSort(a, b) {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }
  return 0;
}
