export default function Footer() {
    return (
        <footer className="border-t border-border bg-card/50 mt-12">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                    <div className="flex items-center gap-3">
                        <div className="flex gap-0.5">
                            {["#D21034", "#1a1a1a", "#FCE100", "#009A44"].map(c => (
                                <div key={c} className="w-1 h-4 rounded-sm" style={{ backgroundColor: c }} />
                            ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                            Atlas do Desenvolvimento · Moçambique
                        </span>
                    </div>
                    <div className="text-xs text-muted-foreground">
                        Dados: Banco Mundial, INE, UNDP · 2000–2022
                    </div>
                </div>
            </div>
        </footer>
    )
}

