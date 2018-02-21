package io.jhipster.test1.service.dto;


import javax.validation.constraints.*;
import java.io.Serializable;
import java.util.Objects;

/**
 * A DTO for the Diplome entity.
 */
public class DiplomeDTO implements Serializable {

    private Long id;

    @NotNull
    private String libelleFr;

    @NotNull
    private String libelleAr;

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

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (o == null || getClass() != o.getClass()) {
            return false;
        }

        DiplomeDTO diplomeDTO = (DiplomeDTO) o;
        if(diplomeDTO.getId() == null || getId() == null) {
            return false;
        }
        return Objects.equals(getId(), diplomeDTO.getId());
    }

    @Override
    public int hashCode() {
        return Objects.hashCode(getId());
    }

    @Override
    public String toString() {
        return "DiplomeDTO{" +
            "id=" + getId() +
            ", libelleFr='" + getLibelleFr() + "'" +
            ", libelleAr='" + getLibelleAr() + "'" +
            "}";
    }
}
