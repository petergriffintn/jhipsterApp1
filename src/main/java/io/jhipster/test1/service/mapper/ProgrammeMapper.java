package io.jhipster.test1.service.mapper;

import io.jhipster.test1.domain.*;
import io.jhipster.test1.service.dto.ProgrammeDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity Programme and its DTO ProgrammeDTO.
 */
@Mapper(componentModel = "spring", uses = {SpecialiteMapper.class})
public interface ProgrammeMapper extends EntityMapper<ProgrammeDTO, Programme> {

    @Mapping(source = "specialite.id", target = "specialiteId")
    ProgrammeDTO toDto(Programme programme);

    @Mapping(source = "specialiteId", target = "specialite")
    Programme toEntity(ProgrammeDTO programmeDTO);

    default Programme fromId(Long id) {
        if (id == null) {
            return null;
        }
        Programme programme = new Programme();
        programme.setId(id);
        return programme;
    }
}
