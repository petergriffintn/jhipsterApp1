package io.jhipster.test1.service.mapper;

import io.jhipster.test1.domain.*;
import io.jhipster.test1.service.dto.UniversiteDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Universite and its DTO UniversiteDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface UniversiteMapper extends EntityMapper<UniversiteDTO, Universite> {



    default Universite fromId(Long id) {
        if (id == null) {
            return null;
        }
        Universite universite = new Universite();
        universite.setId(id);
        return universite;
    }
}
