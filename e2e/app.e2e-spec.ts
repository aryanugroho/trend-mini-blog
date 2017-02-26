import { ReactiveDeveloperPage } from './app.po';

describe('reactive-developer App', function() {
  let page: ReactiveDeveloperPage;

  beforeEach(() => {
    page = new ReactiveDeveloperPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
