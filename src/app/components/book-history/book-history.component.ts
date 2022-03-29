import { HttpClient } from '@angular/common/http';
import { Component, Injectable, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { DefaultStore, FireListBaseDataService } from '@bookhistory/shared';
import { getClassName } from '@bookhistory/shared/tools';
import { tap } from 'rxjs';
import { SubSink } from 'subsink';
import { BookHistory } from './book-history.models';

@Injectable()
export class BookHistoryStore<BookHistory> extends DefaultStore<BookHistory> {
  public constructor(
    protected _baseDataService: BookHistoryFireListDataService<BookHistory>
  ) {
    super(_baseDataService);
  }
}

@Injectable()
export class BookHistoryFireListDataService<
  Book
> extends FireListBaseDataService<Book> {
  public constructor(db: AngularFireDatabase, httpClient: HttpClient) {
    super(getClassName(BookHistory), db, httpClient);
  }
}

@Component({
  selector: 'app-book-history',
  templateUrl: './book-history.component.html',
  styleUrls: ['./book-history.component.scss'],
})
export class BookHistoryComponent implements OnInit {
  first = 0;

  rows = 10;

  loading: boolean = true;

  private subs = new SubSink();

  constructor(public bookHistoryStore: BookHistoryStore<BookHistory>) {}

  public ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  ngOnInit() {
    this.subs.sink = this.bookHistoryStore
      .getSnapshotChanges()
      .pipe(tap(() => (this.loading = false)))
      .subscribe();
  }

  isFirstPage(): boolean {
    return this.bookHistoryStore.getStore() ? this.first === 0 : true;
  }
}
