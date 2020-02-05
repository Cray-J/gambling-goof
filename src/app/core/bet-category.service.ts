import { Injectable } from '@angular/core';
import { BetCategory } from '../shared/model/bet-category.model';
import { Subject, Subscription } from 'rxjs';
import { AngularFirestore } from 'angularfire2/firestore';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class BetCategoryService {
  public betCategories: BetCategory[] = [];
  public betCategoriesChanged = new Subject<BetCategory[]>();
  private fbSubs: Subscription[] = [];

  constructor(private db: AngularFirestore) {
  }

  public addCategory(category: BetCategory) {
    this.db.collection('betCategories').add(category);
    this.betCategories.push(category);
    this.betCategoriesChanged.next(this.betCategories);
  }

  public fetchCategories() {
    this.fbSubs.push(
      this.db
        .collection('betCategories')
        .snapshotChanges()
        .pipe(
          map(docArray => docArray.map(doc => doc.payload.doc.data() as BetCategory))
        )
        .subscribe((categories: BetCategory[]) => {
          this.betCategories = categories;
          this.betCategoriesChanged.next([...this.betCategories]);
        })
    );
  }
}
