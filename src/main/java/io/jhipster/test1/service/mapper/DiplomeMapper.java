package io.jhipster.test1.service.mapper;

import io.jhipster.test1.domain.*;
import io.jhipster.test1.service.dto.DiplomeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Diplome and its DTO DiplomeDTO.
 */
@Mapper(componentModel = "spring", uses = {})
public interface DiplomeMapper extends EntityMapper<DiplomeDTO, Diplome> {



    default Diplome fromId(Long id) {
        if (id == null) {
            return null;
        }
        Diplome diplome = new Diplome();
        diplome.setId(id);
        return diplome;
    }
}
