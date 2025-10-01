'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { allProperties, primaryCategories, subCategories, estatusOptions } from './products';

// --- Iconos para la UI ---
const IconSearch = () => <svg className="h-5 w-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;
const IconFilter = () => <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" /></svg>;
const IconGrid = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const IconList = () => <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" /></svg>;
const IconChevronDown = () => <svg className="w-5 h-5 ml-1 -mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const IconX = () => <svg className="w-4 h-4 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>;


const PropertyCard = ({ property, viewMode, onClick }) => {
    return (
        <div 
            className={`bg-white border border-stone-200 rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group cursor-pointer relative
                       ${viewMode === 'list' ? 'flex flex-col sm:flex-row' : ''}
                       transform hover:-translate-y-1`}
            onClick={onClick}
        >
            <div className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                 style={{ boxShadow: 'inset 0 0 0px 2px rgba(234, 179, 8, 0.5)' }}></div> {/* Acento Dorado */}

            <div className={`relative overflow-hidden ${viewMode === 'list' ? 'sm:w-2/5 flex-shrink-0' : ''}`}>
                <image src={property.image} alt={property.name} className={`object-cover w-full transition-transform duration-300 ${viewMode === 'list' ? 'h-full' : 'h-56'} group-hover:scale-105`} />
                <div className="absolute top-3 right-3 bg-emerald-700 text-white px-3 py-1 text-xs font-bold rounded-full shadow-md">
                    Ahorro {property.ahorro}
                </div>
            </div>
            <div className={`p-5 flex flex-col flex-1 ${viewMode === 'list' ? 'sm:w-3/5' : ''}`}>
                <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-yellow-600">{property.primaryCategory}</span>
                    <span className="text-xs text-stone-500">{property.ubicacion}</span>
                </div>
                <h3 className={`font-semibold text-stone-800 mb-3 group-hover:text-stone-900 transition-colors ${viewMode === 'grid' ? 'text-lg h-14' : 'text-xl'}`}>
                    {property.name}
                </h3>
                
                {viewMode === 'list' && (
                    <p className="text-sm text-stone-600 mb-4 line-clamp-2">{Array.isArray(property.description) ? property.description[0] : property.description}</p>
                )}

                <div className={`grid grid-cols-2 gap-4 mb-4 ${viewMode === 'grid' ? 'mt-auto' : ''}`}>
                    <div>
                        <div className="text-sm text-stone-500">Precio Cesión</div>
                        <div className={`font-bold text-emerald-800 ${viewMode === 'grid' ? 'text-xl' : 'text-2xl'}`}>${property.precioCesion}</div>
                    </div>
                    <div className="text-right">
                        <div className="text-sm text-stone-500">Valor Comercial</div>
                        <div className={`font-semibold text-stone-500 line-through ${viewMode === 'grid' ? 'text-base' : 'text-lg'}`}>${property.valorComercial}</div>
                    </div>
                </div>
                <button className="w-full text-center px-4 py-2.5 bg-stone-800 text-white font-semibold rounded-lg hover:bg-stone-700 transition-colors duration-300 mt-auto shadow-sm">
                    Ver Detalles
                </button>
            </div>
        </div>
    );
};

function CatalogoContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedPrimaryCategory, setSelectedPrimaryCategory] = useState('Todos');
  const [selectedSubCategories, setSelectedSubCategories] = useState([]);
  const [selectedEstatus, setSelectedEstatus] = useState('Todos');
  const [filteredProperties, setFilteredProperties] = useState(allProperties);
  const [isLoading, setIsLoading] = useState(true);
  const [isFiltersExpanded, setIsFiltersExpanded] = useState(false);
  const [viewMode, setViewMode] = useState('grid');
  const [sortBy, setSortBy] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const PROPERTIES_PER_PAGE = 9;

  // Lógica de hooks y handlers (sin cambios)
  useEffect(() => {
    const categoryFromUrl = searchParams.get('category');
    if (categoryFromUrl && primaryCategories.includes(categoryFromUrl)) { setSelectedPrimaryCategory(categoryFromUrl); } else { setSelectedPrimaryCategory('Todos'); }
  }, [searchParams]);

  useEffect(() => {
    setIsLoading(true);
    const timeoutId = setTimeout(() => {
      let filtered = [...allProperties];
      if (selectedPrimaryCategory !== 'Todos') { filtered = filtered.filter(p => p.primaryCategory === selectedPrimaryCategory); }
      if (selectedSubCategories.length > 0) { filtered = filtered.filter(p => p.subCategories && p.subCategories.some(sub => selectedSubCategories.includes(sub))); }
      if (selectedEstatus !== 'Todos') { filtered = filtered.filter(p => p.estatus === selectedEstatus); }
      if (searchTerm) { const lowercasedFilter = searchTerm.toLowerCase(); filtered = filtered.filter(p => (p.name && p.name.toLowerCase().includes(lowercasedFilter)) || (p.ubicacion && p.ubicacion.toLowerCase().includes(lowercasedFilter))); }
      if (sortBy === 'precio-asc') { filtered.sort((a, b) => parseFloat(a.precioCesion.replace(/,/g, '')) - parseFloat(b.precioCesion.replace(/,/g, ''))); }
      else if (sortBy === 'precio-desc') { filtered.sort((a, b) => parseFloat(b.precioCesion.replace(/,/g, '')) - parseFloat(a.precioCesion.replace(/,/g, ''))); }
      else if (sortBy === 'ahorro-desc') { filtered.sort((a, b) => parseFloat(b.ahorro) - parseFloat(a.ahorro)); }
      setFilteredProperties(filtered);
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timeoutId);
  }, [selectedPrimaryCategory, selectedSubCategories, selectedEstatus, searchTerm, sortBy]);
  
  useEffect(() => { setCurrentPage(1); }, [filteredProperties]);
  
  const handlePrimaryCategoryChange = (category) => { setSelectedPrimaryCategory(category); };
  const handleSubCategoryToggle = (subCategory) => { setSelectedSubCategories(prev => prev.includes(subCategory) ? prev.filter(s => s !== subCategory) : [...prev, subCategory]); };
  const clearAllFilters = () => { setSelectedPrimaryCategory('Todos'); setSelectedSubCategories([]); setSelectedEstatus('Todos'); setSearchTerm(''); setSortBy(''); };
  const handlePropertyClick = (propertyId) => { router.push(`/pages/tienda-gym/productos/${propertyId}`); };
  const getActiveFiltersCount = () => { let count = selectedSubCategories.length; if (selectedPrimaryCategory !== 'Todos') count++; if (selectedEstatus !== 'Todos') count++; if (searchTerm) count++; return count; };
  
  const indexOfLastProperty = currentPage * PROPERTIES_PER_PAGE;
  const indexOfFirstProperty = indexOfLastProperty - PROPERTIES_PER_PAGE;
  const currentProperties = filteredProperties.slice(indexOfFirstProperty, indexOfLastProperty);
  const totalPages = Math.ceil(filteredProperties.length / PROPERTIES_PER_PAGE);
  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div className="bg-stone-100 min-h-screen">
<section className="relative py-10 sm:py-10 bg-stone-200 border-b-2 border-stone-300 overflow-hidden">
      <div className="relative max-w-screen-xl mx-auto px-6 lg:px-8 text-left">
        <div className="max-w-2xl">
          <h2 className="text-sm font-semibold tracking-wide uppercase text-amber-600">
            Nuestro Catálogo
          </h2>
          <p className="mt-3 text-3xl sm:text-4xl font-bold text-stone-800 leading-tight">
            Oportunidades de Inversión
          </p>
          <p className="mt-4 text-lg text-stone-600 leading-relaxed">
            Explora, filtra y encuentra la propiedad ideal para tu portafolio de inversión.
          </p>
        </div>
      </div>
    </section>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8 border border-stone-200">
            <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <div className="relative flex-grow text-black"><div className=" text-black absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none"><IconSearch /></div><input type="text" placeholder="Buscar por nombre o ubicación..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full pl-10 pr-4 py-2 border border-stone-300 rounded-lg text-sm focus:ring-yellow-500 focus:border-yellow-500"/></div>
                <button onClick={() => setIsFiltersExpanded(!isFiltersExpanded)} className="flex-shrink-0 flex items-center justify-center gap-2 px-4 py-2 border border-stone-300 rounded-lg bg-stone-50 text-stone-700 font-semibold hover:bg-stone-100 transition-colors"><IconFilter /> {isFiltersExpanded ? 'Ocultar Filtros' : `Más Filtros (${getActiveFiltersCount()})`} <IconChevronDown /></button>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="flex-shrink-0 w-full sm:w-auto p-2 border border-stone-300 rounded-lg text-sm focus:ring-yellow-500 focus:border-yellow-500 bg-white text-stone-700"><option value="">Ordenar por Relevancia</option><option value="precio-asc">Precio: Menor a Mayor</option><option value="precio-desc">Precio: Mayor a Menor</option><option value="ahorro-desc">Mayor Ahorro</option></select>
            </div>
            {isFiltersExpanded && (<div className="border-t border-stone-200 pt-6 mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"><div><h3 className="font-semibold text-stone-800 mb-3">Tipo de Propiedad</h3><select value={selectedPrimaryCategory} onChange={(e) => handlePrimaryCategoryChange(e.target.value)} className=" text-black w-full p-2 border border-stone-300 rounded-lg text-sm focus:ring-yellow-500 focus:border-yellow-500"><option value="Todos">Todos</option>{primaryCategories.filter(c => c !== 'Todos').map(cat => (<option key={cat} value={cat}>{cat}</option>))}</select></div><div><h3 className=" text-black font-semibold text-stone-800 mb-3">Estatus Legal</h3><select value={selectedEstatus} onChange={(e) => setSelectedEstatus(e.target.value)} className="text-black w-full p-2 border border-stone-300 rounded-lg text-sm focus:ring-yellow-500 focus:border-yellow-500"><option value="Todos">Todos</option>{estatusOptions.filter(c => c !== 'Todos').map(est => (<option key={est} value={est}>{est}</option>))}</select></div><div><h3 className="font-semibold text-stone-800 mb-3">Características</h3><div className="space-y-2 max-h-40 overflow-y-auto pr-2">{subCategories.filter(c => c !== 'Todos').map((subCat) => (<label key={subCat} className="flex items-center gap-2 text-sm text-stone-700 cursor-pointer"><input type="checkbox" checked={selectedSubCategories.includes(subCat)} onChange={() => handleSubCategoryToggle(subCat)} className="w-4 h-4 text-yellow-600 border-stone-300 rounded focus:ring-yellow-500" />{subCat}</label>))}</div></div>{getActiveFiltersCount() > 0 && (<div className="col-span-full pt-4"><button onClick={clearAllFilters} className="px-4 py-2 bg-stone-100 text-stone-700 rounded-lg hover:bg-stone-200 transition-colors text-sm font-semibold">Limpiar Todos los Filtros</button></div>)}</div>)}
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-white/0 p-4 rounded-xl">
            <p className="text-sm text-stone-600 font-medium mb-2 sm:mb-0">Mostrando <span className="font-bold text-stone-900">{currentProperties.length}</span> de <span className="font-bold text-stone-900">{filteredProperties.length}</span> oportunidades</p>
            <div className="flex items-center gap-2">
                <button onClick={() => setViewMode('grid')} className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'grid' ? 'bg-stone-800 text-white shadow-md' : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-300'}`}><IconGrid /></button>
                <button onClick={() => setViewMode('list')} className={`p-2 rounded-lg transition-colors duration-200 ${viewMode === 'list' ? 'bg-stone-800 text-white shadow-md' : 'bg-white text-stone-600 hover:bg-stone-200 border border-stone-300'}`}><IconList /></button>
            </div>
        </div>

        {isLoading ? (<div className="text-center py-20 font-semibold text-stone-600">Cargando Oportunidades...</div>) : filteredProperties.length === 0 ? (<div className="text-center py-20 bg-white border border-stone-200 rounded-xl shadow-sm"><h3 className="text-xl font-semibold text-stone-800">No se encontraron resultados</h3><p className="text-stone-500 mt-2">Intenta ajustar o limpiar los filtros de búsqueda.</p></div>) : (
          <>
            <div className={`grid gap-8 ${viewMode === 'grid' ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>{currentProperties.map((prop) => (<PropertyCard key={prop.id} property={prop} viewMode={viewMode} onClick={() => handlePropertyClick(prop.id)} />))}</div>
            {totalPages > 1 && (<nav className="mt-12 flex justify-center"><ul className="flex items-center -space-x-px h-10 text-base"><li><button onClick={paginate.bind(null, currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center px-4 h-10 ms-0 leading-tight text-stone-500 bg-white border border-stone-300 rounded-l-lg hover:bg-stone-100 hover:text-stone-700 disabled:opacity-50 disabled:cursor-not-allowed">Anterior</button></li>{Array.from({ length: totalPages }, (_, i) => i + 1).map(number => (<li key={number}><button onClick={() => paginate(number)} className={`flex items-center justify-center px-4 h-10 leading-tight border border-stone-300 ${currentPage === number ? 'text-white bg-stone-800 border-stone-800 shadow-md' : 'text-stone-500 bg-white hover:bg-stone-100 hover:text-stone-700'}`}>{number}</button></li>))}<li><button onClick={paginate.bind(null, currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center justify-center px-4 h-10 leading-tight text-stone-500 bg-white border border-stone-300 rounded-r-lg hover:bg-stone-100 hover:text-stone-700 disabled:opacity-50 disabled:cursor-not-allowed">Siguiente</button></li></ul></nav>)}
          </>
        )}
      </div>
    </div>
  );
}

export default function CatalogoOportunidades() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-stone-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-stone-700">Cargando Oportunidades...</div>
      </div>
    }>
      <CatalogoContent />
    </Suspense>
  );
}