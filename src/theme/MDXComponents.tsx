import MDXComponents from '@theme-original/MDXComponents';
import {
  AutoHeightIframe,
  ExpandableItem,
  Expandables,
  Step,
  Stepper,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@site/src/components/mdx';

// Make the sample components available in every MDX page without imports.
export default {
  ...MDXComponents,
  AutoHeightIframe,
  ExpandableItem,
  Expandables,
  Step,
  Stepper,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
};
