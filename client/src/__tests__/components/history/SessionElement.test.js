import SessionElement from "../../../js/components/history/SessionElement";

import createDateString from "../../../js/components/global/createDateString";
import addThousandComma from "../../../js/components/global/addThousandComma";

const mockSession = {
  sharedWith: "person",
  currency: "RSD",
  yourTotal: 61.5,
  sharedWithTotal: 61.5,
  billsPaid: [
    {
      id: "yRe05Bnu15",
      name: "bill",
      value: 123,
      unshared: 0,
      splitValue: 61.5,
      directlyOwed: false,
      billOwner: "main"
    }
  ],
  billsToPay: [
    {
      id: "te1W36yQxC",
      name: "bill",
      value: 123,
      unshared: 0,
      splitValue: 61.5,
      directlyOwed: false,
      billOwner: "secondary"
    }
  ],
  createdOn: 1707180143971,
  sessionID: "nG05Mdzf0tmCYWuc"
};

const mockSessionHTML = `<div class="history-content-session" data-sessionid="nG05Mdzf0tmCYWuc"><div class="history-content-session-item"><p>Created on:</p><p>6 Feb 2024</p></div><div class="history-content-session-item"><p>Shared with:</p><p>person</p></div><div class="history-content-session-item"><p>You're owed:</p><p>0.00 RSD</p></div><div class="history-content-session-item"><p>Total bills:</p><p>2</p></div><div class="history-content-session-item"><a href="session.html?nG05Mdzf0tmCYWuc" class="btn btn-border-cta displaySessionBtn">Display session</a><p tabindex="0" class="delete-session text-danger removeSessionBtn">Remove session</p></div></div>`;

document.body.innerHTML = mockSessionHTML;
let sessionElement = new SessionElement();

describe('create(session)', () => {
  it('should return an HTML session element using the data from the passed in session', () => {
    const expectedSessionElement = document.querySelector('.history-content-session');
    expect(sessionElement.create(mockSession)).toEqual(expectedSessionElement);
  });
});

// No point in testing the rest of the functions, as they're quite basic, and the main create() function passing the test verifies they're logic is okay.