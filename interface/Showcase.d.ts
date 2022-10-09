interface ComponentShowcase {
  title: string;
  sections: ComponentShowcaseSection[];
}

interface ComponentShowcaseSection {
  title?: string;
  items: ComponentShowcaseItem[];
}

interface ComponentShowcaseItem {
  title?: string;
  props: any;
}

interface ComponentShowcaseSetting {
  propertyName: string;
  value: any;
  description?: string;
}
