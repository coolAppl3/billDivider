function dispatchMainGlobalEvents() {
  dispatchEvent(new Event('updateSessionInfo'));
  dispatchEvent(new Event('render'));
};

export default dispatchMainGlobalEvents;