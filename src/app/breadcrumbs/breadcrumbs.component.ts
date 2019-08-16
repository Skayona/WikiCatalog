import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd, RouterEvent } from '@angular/router';

interface IBreadcrumbs {
  title: string;
  link: string;
}

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styleUrls: ['./breadcrumbs.component.scss']
})

export class BreadcrumbsComponent implements OnInit {
  breadcrumbs: IBreadcrumbs[];
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.breadcrumbs = [];
  }

  ngOnInit() {
    this.router.events.subscribe((e: RouterEvent) => {
      if (e instanceof NavigationEnd) {
        this.breadcrumbs = this.getBreadcrumbs(this.route);
      }
    });
  }

  goTo(e: Event, link: string) {
    e.preventDefault();
    this.router.navigate([link], {
      relativeTo: this.route
    });

  }

  getBreadcrumbs(route: ActivatedRoute, parentLink?: string) {
    const breadcrumb = route.snapshot.data.breadcrumbs;
    const link = route.snapshot.url.reduce((prev, curr) => {
      return `${ prev }/${ curr }`;
    }, '');

    let breadcrumbs = (breadcrumb && link) ? [ {
      title: route.snapshot.data.breadcrumbs,
      link: parentLink ? `${ parentLink }/${ link }` : link
    }] : [];

    if (route.firstChild) {
      breadcrumbs = [...breadcrumbs, ...this.getBreadcrumbs(route.firstChild, link)];
    }

    return breadcrumbs;
  }

}
