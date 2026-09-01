import { catalogue, groupOrder } from "./data/catalogue";
import { TopBar } from "./components/TopBar";
import { SideNav } from "./components/SideNav";
import { CoverPage } from "./components/CoverPage";
import { WelcomePage } from "./components/WelcomePage";
import { CategoryPage } from "./components/CategoryPage";
import { Visualiser } from "./components/visualiser/Visualiser";
import { Addendum } from "./components/Addendum";

export default function App() {
  return (
    <div className="min-h-screen">
      <TopBar />
      <div className="mx-auto flex max-w-7xl gap-8 px-4 py-8 sm:px-6">
        <SideNav />
        <main className="flex min-w-0 flex-1 flex-col gap-6">
          <CoverPage />
          <WelcomePage />
          <Visualiser />
          {groupOrder.map((group) => (
            <div key={group} className="flex flex-col gap-6">
              {catalogue
                .filter((c) => c.group === group)
                .map((section) => (
                  <CategoryPage key={section.id} section={section} />
                ))}
            </div>
          ))}
          <Addendum />
          <footer className="no-print px-2 py-8 text-center text-[11px] text-stone-400">
            Granny Flats Perth — Digital Specification Selection Book. A working prototype; a few line items
            (vanity supplier, some electrical extras) still show placeholder iconography pending real assets.
          </footer>
        </main>
      </div>
    </div>
  );
}
