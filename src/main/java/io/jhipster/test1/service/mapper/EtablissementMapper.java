package io.jhipster.test1.service.mapper;

import io.jhipster.test1.domain.*;
import io.jhipster.test1.service.dto.EtablissementDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Etablissement and its DTO EtablissementDTO.
 */
@Mapper(componentModel = "spring", uses = {UniversiteMapper.class})
public interface EtablissementMapper extends EntityMapper<EtablissementDTO, Etablissement> {

    @Mapping(source = "universite.id", target = "universiteId")
    EtablissementDTO toDto(Etablissement etablissement);

    @Mapping(source = "universiteId", target = "universite")
    Etablissement toEntity(EtablissementDTO etablissementDTO);

    default Etablissement fromId(Long id) {
        if (id == null) {
            return null;
        }
        Etablissement etablissement = new Etablissement();
        etablissement.setId(id);
        return etablissement;
    }
}
