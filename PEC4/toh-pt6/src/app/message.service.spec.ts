import {MessageService} from './message.service';

describe('MessageService', () => {
  let service: MessageService;
  beforeEach(() => {
    service = new MessageService();
  });

  it('add method should append a message', () => {
    service.add('TestMessage');
    expect(service.messages.length).toBe(1);
  });

  it('add method should append a message at the end of the array', () => {
    service.add('TestMessage');
    expect(service.messages[0]).toBe('TestMessage');
  });

  it('clear method delete elements when the array is empty', () => {
    service.clear();
    expect(service.messages.length).toBe(0);
  });

  it('clear method delete elements when the array has messages', () => {
    service.add('TestMessage1');
    service.add('TestMessage2');
    service.clear();
    expect(service.messages.length).toBe(0);
  });
});

