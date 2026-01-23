<template>
  <div>
    <SectionsHeroSection />
    <SectionsMarketOverview />
    <ClientOnly>
      <SectionsMiningSection />
    </ClientOnly>
    <ClientOnly>
      <SectionsCommunitySection />
    </ClientOnly>
    <ClientOnly>
      <SectionsTrustSection />
    </ClientOnly>
  </div>
</template>
