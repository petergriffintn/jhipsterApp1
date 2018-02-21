package io.jhipster.test1.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

/**
 * A DTO for the Programme entity.
 */
public class ProgrammeDTO implements Serializable {

    private Long id;

    @NotNull
    private String libelleFr;

    @NotNull
    private String libelleAr;

    private Long specialiteId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getLibelleFr() {
        return libelleFr;
    }

    public void setLibelleFr(String libelleFr) {
        this.libelleFr = libelleFr;
    }

    public String getLibelleAr() {
        return libelleAr;
    }

    public void setLibelleAr(String libelleAr) {
        this.libelleAr = libelleAr;
    }

    public Long getSpecialiteId() {
        return specialiteId;
    }

    public void setSpecialiteId(Long specialiteId) {
        this.specialiteId = specialiteId;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        ProgrammeDTO programmeDTO = (ProgrammeDTO) o;
        if(programmeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), programmeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "ProgrammeDTO{" +
            "id=" + getId() +
            ", libelleFr='" + getLibelleFr() + "'" +
            ", libelleAr='" + getLibelleAr() + "'" +
            "}";
    }
}
