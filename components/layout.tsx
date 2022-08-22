import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { DefaultSeo } from "next-seo";
import { defaultSeo } from "next-seo.config";
import React from "react";

interface Props {
  children: React.ReactNode | React.ReactNode[];
  footer: any;
  navigation: any;
}

const Layout: React.FC<Props> = ({ children, footer, navigation }) => {
  return (
    <React.Fragment>
      <DefaultSeo {...defaultSeo} />
      <Header {...navigation} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6">{children}</div>
      <Footer {...footer} />
    </React.Fragment>
  );
};

export default Layout;
