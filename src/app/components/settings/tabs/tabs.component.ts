import { AfterContentInit, Component, ContentChildren, QueryList } from "@angular/core";
import { TabComponent } from "./tab.component";
import { signal } from "@angular/core";

@Component({
    selector: 'app-tabs',
    template: `<ng-content />`,
    standalone: true,
    imports: [TabComponent]
  })
  export class TabsComponent implements AfterContentInit {
    @ContentChildren(TabComponent)
    private tabQuery!: QueryList<TabComponent>;
  
    // Signal state
    private readonly _tabs = signal<TabComponent[]>([]);
    readonly tabs = this._tabs.asReadonly();
  
    readonly activeTab = signal<TabComponent | null>(null);
  
    ngAfterContentInit() {
      // initialize once
      this._tabs.set(this.tabQuery.toArray());
  
      // default selection
      this.select(this._tabs()[0]);
  
      // react to dynamic content changes
      this.tabQuery.changes.subscribe(q =>
        this._tabs.set(q.toArray())
      );
    }
  
    select(tab: TabComponent | undefined) {
      if (!tab) return;
  
      this._tabs().forEach(t => t.active.set(false));
      tab.active.set(true);
      this.activeTab.set(tab);
    }
  }
  