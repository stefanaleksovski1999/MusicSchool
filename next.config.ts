const createNextintlPlugin = require("next-intl/plugin");
import type { NextConfig } from "next";

const withNextIntl = createNextintlPlugin();

const nextConfig: NextConfig = {
  /* config options here */
};

export default withNextIntl(nextConfig);